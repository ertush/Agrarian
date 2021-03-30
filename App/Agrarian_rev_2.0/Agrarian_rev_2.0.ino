
/*****
 
 Firmware : Agrarian
 Author : Eric Mutua
 
*****/

#include <Wire.h>
#include <ESP8266WiFi.h>
#include <WiFiClientSecure.h>
#include <PubSubClient.h>
#include <SoftwareSerial.h>
#include <TinyGPS.h>

// For Debugging MQTT Client
#define DEBUG_MAIN(...) Serial.printf(__VA_ARGS__)

#ifndef DEBUG_MAIN
#define DEBUG_MAIN(...)
#endif

#include "DHTesp.h"
#include "SoilMoisture.h"
#include "Adafruit_VEML6070.h"
#include "AgrarianConfig.h"
#include "OTASupport.h"
//#include "Buzzer.h"
//#include "SFE_BMP180.h"

// Sensor GPIO (inputs) Declaration

#define DHT_PIN 2     // D3
#define NEO_RX 12     // D7 
#define NEO_TX 13     // D6
#define SOIL_PIN A0   // A0

// Sensor GPIO (outputs) Declaration

#define GREEN_LED 14      // D5 
#define BLUE_LED 16       // D0 
//#define BUZZER_PIN 15   // D8  proposed pin is DO
#define WIFI_CON 1
#define MQTT_CON 2
// Constants and Objects

DHTesp dht;
SoilMoisture soilMoisture_3v3(SOIL_PIN);
Adafruit_VEML6070 uv = Adafruit_VEML6070();
TinyGPS gps;
//SFE_BMP180 bmp180;
SoftwareSerial ss(NEO_RX, NEO_TX);

WiFiClientSecure espClient;
PubSubClient client(espClient);

long now = millis();
long lastMeasure = 0;

// ================== Websocket methods ============== //
void onMqttPublish(char *topic, byte *payload, unsigned int length)
{
  DEBUG_MAIN("received %s %.*s\n", topic, length, payload);
}
  
// ================== custom methods ================= //

void setup_wifi() {

  delay(10);
  
  DEBUG_MAIN("WiFi connecting to %s\n", WIFI_SSID);
  Serial.println(WIFI_SSID);
  WiFi.mode(WIFI_STA);
  WiFi.begin(WIFI_SSID, WIFI_PASS);
  while (WiFi.status() != WL_CONNECTED) {
    DEBUG_MAIN(".");
    delay(500);
  }
  blinkLeds(WIFI_CON);
  DEBUG_MAIN("\nWiFi connected to %s with ip \n", WiFi.SSID().c_str());
  Serial.print(WiFi.localIP());
  espClient.setFingerprint(fingerprint);
}


void reconnect() {
  
  // Loop until we're reconnected
  while (!client.connected()) {
     client.publish("esp8266/status", "Offline");
    DEBUG_MAIN("Attempting MQTT connection...\n");
    // Attempt to connect
  
    if (client.connect("ESP8266Client", MQTT_USER, MQTT_PASS)) {
      DEBUG_MAIN("Connected to MQTT Broker\n");

    } else {
      DEBUG_MAIN("failed, rc=");
      DEBUG_MAIN("%d", client.state());
      DEBUG_MAIN("try again in 5 seconds\n");
      delay(5000);
    }
  }
}


void blinkLeds(int event){
  switch(event)
    {
      case 1:
            for(unsigned long start = millis(); millis() - start < 3000;){
                digitalWrite(GREEN_LED, HIGH);
                delay(1000);
                digitalWrite(GREEN_LED, LOW);
                delay(1000);
            }
            //soundBazzer();
      break;
      case 2:
            for(unsigned long start = millis(); millis() - start < 3000;){
                digitalWrite(BLUE_LED, HIGH);
                delay(1000);
                digitalWrite(BLUE_LED, LOW);
                delay(1000);
            }
            //soundBazzer();
      break;
      default:
      
           digitalWrite(GREEN_LED, LOW);
           digitalWrite(BLUE_LED, LOW);
    
    }
}


//===================== End of Custom Methods =====================//

void setup() {
 
  // DHT Setup
  dht.setup(DHT_PIN, DHTesp::DHT22);
  
  pinMode(GREEN_LED, OUTPUT);
  pinMode(BLUE_LED, OUTPUT);

  // Initialize bmp180
  // bmp180.begin();
  
  Serial.begin(SERIAL_BAUD);
  // Neo 6M GPS setup
  ss.begin(GPS_BAUD);
  
  //VEML6070 UV time integration
  uv.begin(VEML6070_1_T);
 
  setup_wifi();

  //OTA support
  //Publish to esp8266/ota
  
  int ot_status = ota_support();
  (ot_status == 0 ? client.publish("esp8266/ota", "\nOTA_SUPPORT_READY") : client.publish("esp8266/ota", "\nOTA_SUPPORT_FAILED")); 
  
  client.setCallback(onMqttPublish);
}

void loop() {
  ArduinoOTA.handle();
  bool newData = false;
  unsigned long chars;
  unsigned short sentences, failed;
  char status;
  float lat_loc, lng_loc;
  float tinyGPSAlt;
 
 
   if (!client.connected()) {
    reconnect();
    blinkLeds(MQTT_CON);
  }
  
  if(!client.loop())
    client.connect("ESP8266Client", MQTT_USER, MQTT_PASS);

  now = millis();

 //==================== Start NEO 6M GPS Reading =======================//

   for (unsigned long start = millis(); millis() - start < 1000;)
  {
    while (ss.available())
    {
      char c = ss.read();
      // Serial.write(c); // uncomment this line if you want to see the GPS data flowing
      if (gps.encode(c)) // Did a new valid sentence come in?
        newData = true;
    }
  }


     if (newData)
  {
    float flat, flon;
    unsigned long age; 
    gps.f_get_position(&flat, &flon, &age); 
    lat_loc = (flat == TinyGPS::GPS_INVALID_F_ANGLE ? 0.0 : flat);
    lng_loc = (flon == TinyGPS::GPS_INVALID_F_ANGLE ? 0.0 : flon);
    tinyGPSAlt = gps.f_altitude();
  }
  
//=================== End of NEO 6M GPS Reading ===========================//
  
  if (now - lastMeasure > 50000) { //initially 30000
     
     
    lastMeasure = now;

  //delay(dht.getMinimumSamplingPeriod());
    float h = dht.getHumidity();
    float t = dht.getTemperature();
    float hi = dht.computeHeatIndex(t, h, false);

    float soilMoisture_3v3Val = map(soilMoisture_3v3.read(), 0, 1023, 0, 15); 

    float uv_index = map(uv.readUV(), 0, 1023, 0, 15);
    
    /*
    float bmp180Alt = bmp180.altitude();
    float bmp180Pressure = bmp180.getPressure();
    float bmp180TempC = bmp180.getTemperatureC();
    
    */
     gps.stats(&chars, &sentences, &failed);
     if (chars == 0){
      DEBUG_MAIN("No characters received from GPS: check wiring!");
     }

    // Check if any reads failed and exit early (to try again).
    if (isnan(h) || isnan(t)) {
      client.publish("esp8266/sensor_debug", "[DEBUG] Failed to read DHT22 sensor!");
      DEBUG_MAIN("\n[DEBUG] Failed to read DHT22 sensor!");
      return;
    }

    if (isnan(soilMoisture_3v3Val)) {
      client.publish("esp8266/sensor_debug", "[DEBUG] Failed to read soil sensor!");
      DEBUG_MAIN("\n[DEBUG] Failed to read soil sensor!");
      return;
    }

    if (isnan(tinyGPSAlt)) {
      client.publish("esp8266/sensor_debug", "[DEBUG] Failed to read NEO_GPS Altitude sensor value!");
      DEBUG_MAIN("\n[DEBUG] Failed to read NEO_GPS Altitude sensor value!");
      return;
    }

    // Enable if bmp180Alt exist

    /*if (isnan(bmp180Alt) || isnan(bmp180Pressure) || isnan(bmp180TempC)) {
      client.publish("esp8266/sensor_debug", "[DEBUG] Failed to read BMP180 sensor!");
      Serial.println("Failed to read BMP180 sensor!");
      return;
    } */
    
    if (isnan(uv_index)) {
      client.publish("esp8266/sensor_debug", "[DEBUG] Failed to read UV_6070 index sensor!");
      DEBUG_MAIN("[DEBUG] Failed to read UV_6070 index sensor!\n");
      return;
    }


    static char temperature[7];
    dtostrf(t, 2, 0, temperature); //initially 6, 2 as 6 for whole numbers and 2 for decimal places

        
    static char humidity[7];
    dtostrf(h, 2, 0, humidity);

    /*        
    static char bmpAlt[7];
    dtostrf(bmp180Alt, 2, 0, bmpAlt);
    

    static char bmpPr[7];
    dtostrf(bmp180Pressure, 2, 0, bmpPr);
    */

    static char valueSoilm[7];
    dtostrf(soilMoisture_3v3Val, 2, 0, valueSoilm);

    static char tinyGPSAltVal[7];
    dtostrf(tinyGPSAlt, 2, 0, tinyGPSAltVal);

    static char uv_lvl[6];
    dtostrf(uv_index, 2, 0, uv_lvl);

    static char loc_lat_txt[7];
    dtostrf(lat_loc, 6, 2, loc_lat_txt);

    static char loc_lng_txt[7];
    dtostrf(lng_loc, 6, 2, loc_lng_txt);
     
    
    client.publish("esp8266/temperature", temperature);
    client.publish("esp8266/humidity", humidity);
    /*
    client.publish("esp8266/alt", bmpAlt);
    client.publish("esp8266/atpressure", bmpPr);
    */
    client.publish("esp8266/ldr", uv_lvl);
    client.publish("esp8266/Soil", valueSoilm);
    client.publish("esp8266/alt", tinyGPSAltVal);
    client.publish("esp8266/loc_lat", loc_lat_txt);
    client.publish("esp8266/loc_lng", loc_lng_txt);
    client.publish("esp8266/status", "Online");
 

    DEBUG_MAIN("\nTemperature: ");
    Serial.print(t);
    DEBUG_MAIN(" [°C]");
    DEBUG_MAIN("\t");
    Serial.print(dht.toFahrenheit(t));
    DEBUG_MAIN(" [F]");
    DEBUG_MAIN("\n");

    DEBUG_MAIN("\nHumidity: ");
    Serial.print(h);
    DEBUG_MAIN(" %");
    DEBUG_MAIN("\n");

  /*
    DEBUG_MAIN("\nAltitude: ");
    Serial.print(bmp180Alt, 2);
    DEBUG_MAIN(" [m]");
    DEBUG_MAIN("\n");

    DEBUG_MAIN("\nAtmospheric Pressure: ");
    Serial.print(bmp180Pressure, 2);
    DEBUG_MAIN(" [hPa]");
    DEBUG_MAIN("\n");
     */
    DEBUG_MAIN("\nSoil Moisture Val: "); 
    Serial.print(soilMoisture_3v3Val);
    DEBUG_MAIN("\n");
    
    DEBUG_MAIN("\nNEO-gps Altitude: ");
    Serial.print(tinyGPSAlt, 2);
    DEBUG_MAIN(" [m]");
    DEBUG_MAIN("\n");

     DEBUG_MAIN("\nLuminosity (uv index): ");
     Serial.print(uv_index);
     DEBUG_MAIN("\n");

     DEBUG_MAIN("\nLAT : ");
     Serial.print(lat_loc, 2);
     DEBUG_MAIN(", ");
     DEBUG_MAIN("\nLNG : ");
     Serial.print(lng_loc, 2);
     DEBUG_MAIN("\n");
 
  }

}
