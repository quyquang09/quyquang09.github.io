#include <Arduino.h>
#include <WiFi.h>
#include <FirebaseESP32.h>

#include "DHT.h"
#define DHT_SENSOR_PIN  14 // Chân ESP32 GIOP23 được kết nối với cảm biến DHT11
#define DHT_SENSOR_TYPE DHT11

#define DHTTYPE DHT11
// Nhiet do, Do am
int nhietDo=0;
int doAm=0;
// Cung cấp thông tin quy trình tạo mã thông báo.
#include "addons/TokenHelper.h"
#include "addons/RTDBHelper.h"


#define WIFI_SSID "J14 pro_2.4G"
#define WIFI_PASSWORD "chaocacanhj14"

// Insert Firebase project API Key
#define API_KEY  "QFt4qBoNer3q6dCc0JjjEzsTHHz36U8jYUfwAIfS"
#define DATABASE_URL "https://baocaocuoikitest-default-rtdb.firebaseio.com/" 

FirebaseData firebaseData;
FirebaseAuth auth;
FirebaseConfig config;

unsigned long sendDataPrevMillis = 0;
int count = 0;
bool signupOK = false;
const int ledPin=2;
int data5base;
// Khởi tạo cảm biến DHT
DHT dht_sensor(DHT_SENSOR_PIN, DHT_SENSOR_TYPE);

void setup(){
  pinMode(32, OUTPUT);
  pinMode(33, OUTPUT);
  pinMode(25, OUTPUT);
  pinMode(26, OUTPUT);
  pinMode(34, OUTPUT);
  Serial.begin(115200);
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("Connecting to Wi-Fi");
  while (WiFi.status() != WL_CONNECTED){
    Serial.print(".");
    delay(300);
  }
  Serial.println();
  Serial.print("Connected with IP: ");
  Serial.println(WiFi.localIP());
  Serial.println();

 // config.api_key = API_KEY;
 // config.database_url = DATABASE_URL;
  //Kêt nối đến firebase
  Firebase.begin(DATABASE_URL, API_KEY);
  Firebase.reconnectWiFi(true);
  dht_sensor.begin(); 
} 

void loop(){
 
  float humi  = dht_sensor.readHumidity();  //đọc giá trị dộ ẩm 
  float Temperature = dht_sensor.readTemperature(); //đọc giá trị nhiệt độ
  if (isnan(Temperature) || isnan(humi)) {
    //Serial.println("Failed to read from DHT sensor!");
  } 
  else {
    Firebase.RTDB.setString(&firebaseData,"/valueSensor/Humidity", humi);
    Firebase.RTDB.setString(&firebaseData,"/valueSensor/temperature", Temperature);
  }

  if(Firebase.RTDB.getString(&firebaseData,"/Fan-bedroom/1/dried")){
  firebaseData.stringData();
  Serial.println(firebaseData.stringData());
  
  if(firebaseData.stringData()=="On"){
    digitalWrite(32, HIGH);
    Serial.println("Dried Fan bedroom ON");
  }else {
    digitalWrite(32,LOW);
    Serial.println("Dried Fan bedroom OFF");
      }
  }
  if(Firebase.RTDB.getString(&firebaseData,"/Fan-bedroom/1/dew")){
  firebaseData.stringData();
  Serial.println(firebaseData.stringData());
  
  if(firebaseData.stringData()=="On"){
    digitalWrite(33, HIGH);
    Serial.println("Dew Fan bedroom ON");
  }else {
    digitalWrite(33,LOW);
    Serial.println("Dew Fan bedroom OFF");
      }
  }

  if(Firebase.RTDB.getString(&firebaseData,"/Fan-bedroom/1/turn")){
  firebaseData.stringData();
  Serial.println(firebaseData.stringData());
  
  if(firebaseData.stringData()=="On"){
    digitalWrite(25, HIGH);
    Serial.println("Turn Fan bedroom ON");
  }else {
    digitalWrite(25, LOW);
    Serial.println("Turn Fan bedroom OFF");
  }
  }
   if(Firebase.RTDB.getString(&firebaseData,"/Fan-bedroom/1/status")){
  firebaseData.stringData();
  Serial.println(firebaseData.stringData());
  
  if(firebaseData.stringData()=="On"){
    digitalWrite(26, HIGH);
    Serial.println("Status Fan bedroom ON");
  }else {
    digitalWrite(26, LOW);
    Serial.println("Status Fan bedroom OFF");
  }
  }
  if(Firebase.RTDB.getString(&firebaseData,"/Fan-bedroom/1/speed")){
    firebaseData.stringData();
    Serial.println(firebaseData.stringData());
    if(firebaseData.stringData()=="LOW"){
      digitalWrite(34, HIGH); 
      delay(100); // đợi 50ms
      digitalWrite(34, LOW);
      delay(100); // đợi 50ms
      
    }else if(firebaseData.stringData()=="MED"){
       digitalWrite(34, HIGH); 
      delay(60); // đợi 50ms
      digitalWrite(34, LOW);
      delay(60); // đợi 50ms
      }
    else if(firebaseData.stringData()=="HIGH") {
      digitalWrite(34, HIGH); 
      delay(30); // đợi 50ms
      digitalWrite(34, LOW);
      delay(30); // đợi 50ms
      }
  }
}
