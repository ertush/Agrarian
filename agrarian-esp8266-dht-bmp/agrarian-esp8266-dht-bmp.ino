/*****
 
 Agrarian
 Eric Mutua
 
*****/

#include <ESP8266WiFi.h>
#include <PubSubClient.h>
#include "DHT.h"
#include "SoilMoisture.h"
#include "SFE_BMP180.h"

#define SOILMOISTURE_3V3_PIN_SIG  A0
#define DHTTYPE DHT22  

const char* ssid = "Pride Centre";
const char* password = "westlands2018";

SoilMoisture soilMoisture_3v3(SOILMOISTURE_3V3_PIN_SIG);

const char* mqtt_server = "34.73.121.27"; 
WiFiClient espClient;
PubSubClient client(espClient);

SFE_BMP180 bmp180;
const int DHTPin = 12;
const int LDRPin = analogRead(A0);

DHT dht(DHTPin, DHTTYPE);

long now = millis();
long lastMeasure = 0;

void setup_wifi() {

  delay(10);
  
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);
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
  
    if (client.connect("ESP8266Client", "hass", "mqttiotlab")) {
      Serial.println("Connected to MQTT Broker");  
    } else {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println(" try again in 5 seconds");
      delay(5000);
    }
  }
}

void setup() {
   
  dht.begin();
  bmp180.begin();
  Serial.begin(115200);
  setup_wifi();
  client.setServer(mqtt_server, 1883);
  client.setCallback(callback);

}

void loop() {
  if (!client.connected()) {
    reconnect();
  }
  if(!client.loop())
    client.connect("ESP8266Client", "hass", "mqttiotlab");
  
  now = millis();
  
  if (now - lastMeasure > 30000) {
    lastMeasure = now;

    float h = dht.readHumidity();
    
    float t = dht.readTemperature();
    
    float f = dht.readTemperature(true);
    
    //float voltage = LDRPin * (5.0 / 1023.0); 
    float voltage = ((float)rand()/(float)(RAND_MAX)) * 5;
    
    double bmp180Alt = bmp180.altitude();
    double bmp180Pressure = bmp180.getPressure();

    float soilMoisture_3v3Val = soilMoisture_3v3.read();

      
    // Check if any reads failed and exit early (to try again).
    if (isnan(h) || isnan(t) || isnan(f)) {
      Serial.println("Failed to read DHT22 sensor!");
      return;
    }

    if (isnan(voltage)) {
      Serial.println("Failed to read LDR sensor!");
      return;
    }
    
    if (isnan(soilMoisture_3v3Val)) {
      Serial.println("Failed to read soil sensor!");
      return;
    }

     if (isnan(bmp180Alt) || isnan(bmp180Pressure)) {
      Serial.println("Failed to read bmp180 sensor!");
      return;
    }

    float hic = dht.computeHeatIndex(t, h, false);
    static char temperatureTemp[7];
    dtostrf(hic, 6, 2, temperatureTemp);
    
    static char humidityTemp[7];
    dtostrf(h, 6, 2, humidityTemp);

    static char voltageLdr[7];
    dtostrf(voltage, 6, 2, voltageLdr);
     

    static char valueSoilm[7];
    dtostrf(soilMoisture_3v3Val, 6, 2, valueSoilm);
    
     static char bmp180AltVal[7];
    dtostrf(bmp180Alt, 6, 2, bmp180AltVal);

    static char bmp180PressureVal[7];
    dtostrf(bmp180Pressure, 6, 2, bmp180PressureVal);
    
    client.publish("esp8266/temperature", temperatureTemp);
    client.publish("esp8266/humidity", humidityTemp);
    client.publish("esp8266/ldr", voltageLdr);
    client.publish("esp8266/Soil", valueSoilm);
    client.publish("esp8266/alt", bmp180AltVal);
    client.publish("esp8266/atpressure", bmp180PressureVal);
    
    Serial.print("Humidity: ");
    Serial.print(h);
    Serial.print("\nTemperature: ");
    Serial.print(t);
    Serial.print(" [°C]");
    Serial.print(f);
    Serial.print("\n[F] Heat index: ");
    Serial.print(hic);
    Serial.print(" [°C]");
    Serial.print ("\nLuminosity (voltage): ");
    Serial.print (voltage);
    Serial.print ("\nAltitude: ");
    Serial.print (bmp180Alt);
    Serial.print (" [m]");
    Serial.print(F("Soil Moisture Val: ")); Serial.println(soilMoisture_3v3Val);
    Serial.print("\nAtmospheric Pressure: ");
    Serial.print (bmp180Pressure);
    Serial.print (" [hPa]");
    
  }
} 
