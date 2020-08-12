#include "OTASupport.h"

const char* OTA_PASS = "microTUSH77";
const uint32_t OTA_PORT = 8267;

int ota_support(){
  // Port defaults to 8266
    ArduinoOTA.setPort(OTA_PORT);

  // Hostname defaults to esp8266-[ChipID]

   // No authentication by default
   ArduinoOTA.setPassword(OTA_PASS);
   
   ArduinoOTA.onStart([]() {
    String type;
    if (ArduinoOTA.getCommand() == U_FLASH) {
      type = "sketch";
    } else { // U_SPIFFS
      type = "filesystem";
    }

    // NOTE: if updating SPIFFS this would be the place to unmount SPIFFS using SPIFFS.end()
    Serial.println("Start updating " + type);
  });
  ArduinoOTA.onEnd([]() {
    Serial.println("\nEnd");
    return 0;
  });
  ArduinoOTA.onProgress([](unsigned int progress, unsigned int total) {
    Serial.printf("Progress: %u%%\r", (progress / (total / 100)));
  });
  ArduinoOTA.onError([](ota_error_t error) {
    Serial.printf("Error[%u]: ", error);
    if (error == OTA_AUTH_ERROR) {
      Serial.println("Auth Failed");
      return -1;
    } else if (error == OTA_BEGIN_ERROR) {
      Serial.println("Begin Failed");
      return -1;
    } else if (error == OTA_CONNECT_ERROR) {
      Serial.println("Connect Failed");
      return -1;
    } else if (error == OTA_RECEIVE_ERROR) {
      Serial.println("Receive Failed");
      return -1;
    } else if (error == OTA_END_ERROR) {
      Serial.println("End Failed");
      return -1;
    }
  });
  
  ArduinoOTA.begin();
  Serial.println("OTA Ready");
  return 0;
}
