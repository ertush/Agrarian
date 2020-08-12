#include "SFE_BMP180.h"


SFE_BMP180 bmp180;

void setup() {
  // put your setup code here, to run once:
  Serial.begin(115200);
  bmp180.begin();

}

void loop() {
  // put your main code here, to run repeatedly:
  float bmp180Alt = bmp180.altitude();
  float bmp180Pressure = bmp180.getPressure();
  float bmp180TempC = bmp180.getTemperatureC();

  Serial.print(F("Altitude: ")); Serial.print(bmp180Alt,1); Serial.print(F(" [m]"));

  delay(1500);
}
