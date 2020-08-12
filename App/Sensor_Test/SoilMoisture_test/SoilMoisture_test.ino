#include "SoilMoisture.h"

#define SOIL_A0 A0

SoilMoisture soilMoisture_3v3(SOIL_A0);


void setup() {
  // put your setup code here, to run once:
  Serial.begin(115200);
 
}

void loop() {
  // put your main code here, to run repeatedly:
  float soilMoisture_3v3Val = map(soilMoisture_3v3.read(), 0, 1023, 0, 15);

  Serial.print("Soil Moisture Index : \t");
  Serial.println(soilMoisture_3v3Val);

  delay(1000);
}
