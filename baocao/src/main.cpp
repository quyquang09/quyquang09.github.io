
#include <Adafruit_Sensor.h>
#include <DHT.h>
#include <DHT_U.h>
#include <SPI.h>
#include <WiFi.h>
#include <WiFi.h>
#include <FirebaseESP32.h>
#include <ArduinoJson.h>

#define pinDHT11 14
const char* ssid = "J14 pro_2.4G";
const char* password =  "chaocacanhj14"; 
#define FIREBASE_HOST "baocaocuoikitest-default-rtdb.firebaseio.com"
#define FIREBASE_AUTH "QFt4qBoNer3q6dCc0JjjEzsTHHz36U8jYUfwAIfS"
FirebaseData firebaseData;
String path ="/";
FirebaseJson json;
SimpleDHT11 dht11(pinDHT11);
byte temp=0,hum=0;

void setup() {
  Serial.begin(115200);
  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
  delay(500);
  Serial.println("Connecting to WiFi..");
  }
  Firebase.begin(FIREBASE_HOST,FIREBASE_AUTH);
  Firebase.reconnectWiFi(true);
  if(!Firebase.beginStream(firebaseData,path))
  {
    Serial.println("REASON: "+firebaseData.errorReason());
    Serial.println();
  }
   Serial.println("Connected with IP: ");
   Serial.println(WiFi.localIP());
   Serial.println();
}

void loop() {
  Firebase.setInt(firebaseData,path + "/data",1); 
}