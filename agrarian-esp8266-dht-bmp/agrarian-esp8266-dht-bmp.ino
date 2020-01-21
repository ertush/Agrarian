#include <TinyGPS++.h>
#include <SoftwareSerial.h>
#include <PubSubClient.h>
#include <ESP8266WiFi.h>
#include "DHT.h"
//#include "SoilMoisture.h"
//#include "SFE_BMP180.h"

//Sensor pin Definitions
//#define HC744051_PIN_S0 0
//#define HC744051_PIN_S1 2
//#define HC744051_PIN_S2 14
//#define HC744051_PIN_A  A0

#define DHTTYPE DHT22
#define SOILMOISTURE_3V3_PIN_SIG  15
#define LDR_PIN A0
const int DHTPin = 16;
static const int RXPin = 12, TXPin = 13; // to be changed as per esp8266
static const uint32_t GPSBaud = 115200;

//instantiate Sensor Objects
DHT dht(DHTPin, DHTTYPE);
//SoilMoisture soilMoisture_3v3(SOILMOISTURE_3V3_PIN_SIG);
//SFE_BMP180 bmp180;
TinyGPSPlus gps;
SoftwareSerial ss(RXPin, TXPin);

long now = millis();
long lastMeasure = 0;

//Connection Credentials
const char* ssid = "HomeNet";
const char* password = "ricoNET77";

const char* mqtt_server = "192.168.1.17"; 
WiFiClient espClient;
PubSubClient client(espClient);

//Callable Methods
void setup_wifi() {

  delay(10);
  
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);
  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.print("WiFi connected - ESP IP address: ");
  Serial.println(WiFi.localIP());
}

void callback(String topic, byte* message, unsigned int length) {
  Serial.print("Message arrived on topic: ");
  Serial.print(topic);
  Serial.print(". Message: ");
  String messageTemp;
  
  for (int i = 0; i < length; i++) {
    Serial.print((char)message[i]);
    messageTemp += (char)message[i];
  }
  Serial.println();
  Serial.println();
}

void reconnect() {
  // Loop until we're reconnected
  while (!client.connected()) {
    Serial.print("Attempting MQTT connection...");
    // Attempt to connect
  
    if (client.connect("ESP8266Client", "mqtt_user", "microAGR77")) {
      Serial.println("Connected to MQTT Broker");  
    } else {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println(" try again in 5 seconds");
      delay(5000);
    }
  }
}

// Main Setup
void setup() {
   
  pinMode(SOILMOISTURE_3V3_PIN_SIG, INPUT);
  dht.begin();
//  bmp180.begin();
  ss.begin(GPSBaud);
  Serial.begin(115200);
  setup_wifi();
  client.setServer(mqtt_server, 1883);
  client.setCallback(callback);
}

// Main Loop
void loop() {
   if (!client.connected()) {
    reconnect();
  }
  
  if(!client.loop())
    client.connect("ESP8266Client", "mqtt_user", "microAGR77");

    
  now = millis();
  
  if (now - lastMeasure > 30000) {
    lastMeasure = now;
   
    float h = dht.readHumidity(true); 
    float t = dht.readTemperature();
   

    float soilMoisture_3v3Val = digitalRead(SOILMOISTURE_3V3_PIN_SIG);
 
    float tinyGPSAlt = gps.altitude.meters();
//    double bmp180Pressure = bmp180.getPressure();

    float voltage_ldr = analogRead(LDR_PIN);

    float loc_lat, loc_lng;

    while(ss.available() > 0){
      gps.encode(ss.read());
      if(gps.location.isUpdated()){
        loc_lat = gps.location.lat();
        loc_lng = gps.location.lng();
       }
     }

    // Check if any reads failed and exit early (to try again).
    if (isnan(h) || isnan(t)) {
      Serial.println("Failed to read DHT22 sensor!");
      return;
    }

    if (isnan(soilMoisture_3v3Val)) {
      Serial.println("Failed to read soil sensor!");
      return;
    }

    if (isnan(tinyGPSAlt)) {
      Serial.println("Failed to read bmp180 sensor!");
      return;
    }

    
    if (isnan(voltage_ldr)) {
      Serial.println("Failed to read LDR sensor!");
      return;
    }

    if(isnan(loc_lat)){
      Serial.println("Failed to read latitude coordinates!");
      return;
     }

     if(isnan(loc_lng)){
      Serial.println("Failed to read longitude coordinates!");
      return;
     }


//    float hic = dht.computeHeatIndex(t, h, false);    
    static char temperatureTemp[7];
    dtostrf(t, 6, 2, temperatureTemp);

        
    static char humidity[7];
    dtostrf(h, 6, 2, humidity);

    static char valueSoilm[7];
    dtostrf(soilMoisture_3v3Val, 6, 2, valueSoilm);

    static char tinyGPSAltVal[7];
    dtostrf(tinyGPSAlt, 6, 2, tinyGPSAltVal);

//    static char bmp180PressureVal[7];
//    dtostrf(bmp180Pressure, 6, 2, bmp180PressureVal);

    static char voltageLdr[7];
    dtostrf(voltage_ldr, 6, 2, voltageLdr);

    static char loc_lat_txt[7];
    dtostrf(loc_lat, 6, 2, loc_lat_txt);

    static char loc_lng_txt[7];
    dtostrf(loc_lng, 6, 2, loc_lng_txt);
     
    
    client.publish("esp8266/temperature", temperatureTemp);
    client.publish("esp8266/humidity", humidity);
    client.publish("esp8266/ldr", voltageLdr);
    client.publish("esp8266/Soil",  valueSoilm);
    client.publish("esp8266/alt",  tinyGPSAltVal);
//    client.publish("esp8266/atpressure", bmp180PressureVal);
    client.publish("esp8266/loc_lat",  loc_lat_txt);
    client.publish("esp8266/lng_lat",  loc_lng_txt);

    Serial.print("\nTemperature: ");
    Serial.print(t);
    Serial.print(" [°C]");
//    Serial.print(f);
//    Serial.print("\n[F] Heat index: ");
//    Serial.print(hic);
//    Serial.print(" [°C]");

    Serial.print("\nSoil Moisture Val: "); 
    Serial.print(soilMoisture_3v3Val);
    
    Serial.print("\nAltitude: ");
    Serial.print(tinyGPSAlt);
    Serial.print(" [m]");

//    Serial.print("\nAtmospheric Pressure: ");
//    Serial.print(bmp180Pressure);
//    Serial.print(" [hPa]");

     Serial.print("\nLuminosity (voltage): ");
     Serial.print(voltage_ldr);

     Serial.print("\nLAT = ");
     Serial.print(loc_lat);
     Serial.print("\nLNG = ");
     Serial.print(loc_lng);
     
    
  }
}
