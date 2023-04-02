/* 
********************************************************************************************************************
----------------------------- PRACA INZYNIERSKA                                        -----------------------------
----------------------------- AUTOR: JAKUB MARCHELSKI                                  -----------------------------
----------------------------- NR INDEKSU: 229112                                       -----------------------------
----------------------------- KIERUNEK: SYSTEMY STEROWANIA INTELIGENTNYMI BUDYNKAMI    -----------------------------
********************************************************************************************************************
*/
#include <Servo.h>              //biblioteka do obsługi serwomechanizmów
#include <LiquidCrystal_I2C.h>  //biblioteka do obsługi wyświetlacza po i2C
#include <SPI.h>                //biblioteka pod SPI 
#include <MFRC522.h>            //biblioteka do obsługi modułu RFID
#include <RCSwitch.h>           //biblioteka do odbiornika 433Mhz
#include <Keypad.h>             //biblioteka do obsługi klawiatury

#define LEDpin 48               //lampka ostrzegawcza
#define foto1 A8                //zmienna przechowująca wartość fotokomórki (0,1)
#define LEDpin 48               //lampka ostrzegawcza
#define Password_Lenght 7       // zmienna pod dlugosc hasla
#define buzzerPin 46
#define RST_PIN   5        
#define SS_PIN    53 

const byte ROWS = 4;
const byte COLS = 4;
int LEDState =HIGH;              // Stan początkowy
int pos=0;
int pos_invert=0;
int alarm;
int previousValueA1=0;
int previousValueA6=0;
char Data[Password_Lenght];      // 6 ZNAKÓW MA HASŁO
char Master[Password_Lenght] = "123456";
char Master1[Password_Lenght] = "123457";
char Master2[Password_Lenght] = "123123";
char customKey;
char keys[ROWS][COLS] = {
  {'1', '2', '3', 'A'},
  {'4', '5', '6', 'B'},
  {'7', '8', '9', 'C'},
  {'*', '0', '#', 'D'}
};

byte data_count = 0, master_count = 0;
byte rowPins[ROWS] = {5, 4, 3, 2}; 
byte colPins[COLS] = {9, 8, 7, 6};
bool Pass_is_good;
bool door = true;
byte expectedTagIDs[][4] = {
  { 0x11, 0xD6, 0x41, 0x23 }
// { 0xC1, 0x93, 0xA2, 0x1B },
// { 0x09, 0x0A, 0x0B, 0x0C },
// { 0x09, 0x0A, 0x0B, 0x0C },
};

Keypad customKeypad( makeKeymap(keys), rowPins, colPins, ROWS, COLS); 
Servo myservo;  //serwo po lewo od bramy
Servo myservo1; //serwo po prawo od bramy
Servo myservoF; //serwo furtka
LiquidCrystal_I2C lcd(0x27, 16, 2);
RCSwitch mySwitch = RCSwitch();
MFRC522 mfrc522(SS_PIN, RST_PIN); 

void setup() {
mySwitch.enableReceive(4);  // Port przerwania
pinMode(14, OUTPUT);
pinMode(A6, INPUT_PULLUP);
pinMode(buzzerPin,OUTPUT);
pinMode(A1, INPUT); 
pinMode(LEDpin, OUTPUT);
pinMode(A6, INPUT_PULLUP);
  SPI.begin();  
  lcd.backlight(); 
  lcd.begin(16, 2);
  lcd.init();
  lcd.print("KONTROLA DOSTEPU");
     mfrc522.PCD_Init(); 
     mfrc522.PCD_DumpVersionToSerial();
    
}

void loop() {


syrena();
Open();
sprawdzenie();
rfid();
wideodomofon();
bramaGPIO();
}

/*---------------------------------------------------------------------------------*/
void brama()
{
 if (myservo.read()<=10)
       {
   lcd.clear();
   lcd.print("Zamykam brame...");
   zamykaniebramy();
   lcd.clear();
   lcd.print("ZAMKNIETO BRAME");
   lcd.setCursor(0,1);
   lcd.print("OSWIETLENIE:OFF");
   delay(1000);
   lcd.clear();
       }

       else{
        lcd.clear();
        lcd.print("Otwieram brame..."); 
        otwieraniebramy();
        lcd.clear();
        lcd.print("OTWARTO BRAME");
        delay(1000);
        lcd.clear();
       }
}
/*---------------------------------------------------------------------------------*/
void przeszkoda(){
  lcd.clear();
    lcd.print("WYKRYTO");
      lcd.setCursor(0,1);
     lcd.print("PRZESZKODE");
    delay(3000);
    if (digitalRead(A8)==0)
    {przeszkoda();}
    else{
      lcd.clear();
      lcd.print("Kontynuuje...");
    return 0;
}
}
/*---------------------------------------------------------------------------------*/
void otwieraniebramy() {
      if (digitalRead(A9)==1){
      digitalWrite(14,HIGH);
      lcd.setCursor(0,1);
      lcd.print("Oswietlam teren");
      }
      for (int i=1;i<=3;i++)         //lampka ostrzegawcza informuje o wykryciu sygnału
      {
        delay(90);
        digitalWrite(LEDpin,HIGH);
        delay(90);
        digitalWrite(LEDpin,LOW);
        }
        myservo.attach(10); 
        myservo1.attach(11); 
        for (pos = 0; pos <= 123; pos += 1) {
        pos_invert=abs(124-pos);
        myservo1.write(pos);             
        myservo.write(pos_invert); 
      if (pos==3|| pos==13|| pos==23 ||pos==33 || pos==43|| pos==53|| pos==63||pos==73 | pos==83||pos==93 || pos==103||pos==113|| pos==123           )    //miganie lampy
      {
      if (LEDState ==0)
      {
        digitalWrite(LEDpin,HIGH);
        LEDState=1;
      }
      else
      {
        digitalWrite(LEDpin,LOW);
        LEDState=0;
        }
      }
      delay(60); 
         
        }
          myservo.detach(); 
         myservo1.detach();  
        digitalWrite(LEDpin,LOW); // wyłączenie lampy ostrzegawczej
        alarm=0; //rozbrojenie alarmu
}
/*---------------------------------------------------------------------------------*/
void zamykaniebramy(){
        for (int i=1;i<=3;i++)
        {
        delay(90);
        digitalWrite(LEDpin,HIGH);
        delay(90);
        digitalWrite(LEDpin,LOW);
        }
        
        myservo.attach(10); //lewe
        myservo1.attach(11);    //prawe
        
        for (pos = 123; pos >= 0; pos -= 1) {
         pos_invert=abs(124-pos);
         myservo1.write(pos);        
         myservo.write(pos_invert); 
        if (pos==3|| pos==13|| pos==23 ||pos==33 || pos==43|| pos==53|| pos==63||pos==73 | pos==83||pos==93 || pos==103||pos==113|| pos==123)  
        {
         if (LEDState ==0)
        {
          digitalWrite(LEDpin,HIGH);
          LEDState=1;
        }
        else
        {
          digitalWrite(LEDpin,LOW);
          LEDState=0;
          }
        }
        if (digitalRead(A8)==1){
        delay(60);
        }
        else{
        przeszkoda();
        }               
        }
        myservo.detach();
        myservo1.detach(); 
        digitalWrite(LEDpin,LOW);
        digitalWrite(14,LOW);
}
/*---------------------------------------------------------------------------------*/
void sprawdzenie ()
{
    switch ( mySwitch.getReceivedValue()) {
    case 16736113:
    brama();
    break; 
    }
    mySwitch.resetAvailable();
}
/*---------------------------------------------------------------------------------*/
void otwarciedrzwi(){ 
  lcd.clear();
  lcd.print("OTWARTO DRZWI");  
  myservoF.attach(13);
  myservoF.write(0); //otwarte
  tone(buzzerPin, 2000, 150);  // MIŁY DŹWIĘK
          delay(300);
          tone(buzzerPin, 2000, 70); 
          delay(120);
          tone(buzzerPin, 2000, 60); 
          delay(110);
           tone(buzzerPin, 2000, 50); 
          delay(100);   
    delay(2000);
    lcd.clear();
    myservoF.write(90); //zamkniecie
    delay(2000);
    alarm =0;
    myservoF.detach();
}
/*---------------------------------------------------------------------------------*/
void rfid(){
       if (mfrc522.PICC_IsNewCardPresent()) {
        if (mfrc522.PICC_ReadCardSerial()) {
        boolean tagIDFound = false;
        for (int i = 0; i < sizeof(expectedTagIDs) / sizeof(expectedTagIDs[0]); i++) {
          if (memcmp(mfrc522.uid.uidByte, expectedTagIDs[i], mfrc522.uid.size) == 0) {
           tagIDFound = true;
           break;
          }}

           if (tagIDFound) {
            
          myservoF.attach(13);
          myservoF.write(0); //otwarte
          lcd.clear();
          lcd.print("OTWARTO DRZWI");       
          tone(buzzerPin, 2000, 150);  // MIŁY DŹWIĘK
          delay(300);
          tone(buzzerPin, 2000, 70); 
          delay(120);
          tone(buzzerPin, 2000, 60); 
          delay(110);
           tone(buzzerPin, 2000, 50); 
          delay(100);
          alarm =0;
          delay(2000); // na dwie sekundy drzwi są otwarte
          lcd.clear();
          myservoF.write(90); //zamkniecie
          delay(300);
          alarm =0;
          myservoF.detach();

          
          }
          else
          {
          tone(buzzerPin, 600, 200);     // NIEMIŁY DŹWIĘK  
                }
        }}
}
/*---------------------------------------------------------------------------------*/
void wideodomofon()
{
if (digitalRead(A6) == 0){
switch (digitalRead(A2)) {
case 0:
tone(buzzerPin, 2200, 170); // Dzwonek
break;
}
}
  
if (digitalRead(A2)==1)
  
{
   myservoF.attach(13); 
   myservoF.write(0); //otwarte
   alarm=0;
   tone(buzzerPin, 2000, 150);
  

   if(digitalRead(A2)==0)
   {
   myservoF.write(90); //zamk
   delay(500);
   myservoF.detach();   
   }
   else {wideodomofon();} 
   }}
/*---------------------------------------------------------------------------------*/
void syrena()
{

if ((digitalRead(A3))==1&&alarm==1 )
{
  
      lcd.clear();
      lcd.print("ALARM!!!");
      for (int i=0;i<3;i++){
      digitalWrite(buzzerPin,HIGH);
      delay(1000); 
      digitalWrite(buzzerPin,LOW);
      delay(1000);   
      }
      lcd.clear();
}}
/*---------------------------------------------------------------------------------*/
void bramaGPIO()
{
    int currentValueA1= digitalRead(A1);
    if (currentValueA1 != previousValueA1){
      
    if ( currentValueA1==1){ // ZMIANA z 0 na 1 (OTWIERANIE)
      
      if (myservo.read()>10) {
      lcd.clear();
      lcd.print("Otwieram brame...");
      otwieraniebramy();
      lcd.clear();
      lcd.print("OTWARTO BRAME");
      delay(1000);
      }
     else
    {
     Open();
    }} 
    
    else if ( currentValueA1==0) // ZMIANA z 1 na 0 (ZAMYKANIE)
    {
       if (myservo.read()>10) {
     Open();
      }
     else
    {
      lcd.clear();
      lcd.print("Zamykam brame...");
      zamykaniebramy();
      lcd.clear();
      lcd.print("ZAMKNIETO BRAME");
      delay(1000);
    }}}
    previousValueA1=currentValueA1;
}
/*---------------------------------------------------------------------------------*/
void clearData()
{
  while (data_count != 0)
  { 
   Data[data_count--] = 0; 
  }
  return;
}
/*---------------------------------------------------------------------------------*/
void Open()
{
  lcd.setCursor(0, 0);
  lcd.print("KONTROLA DOSTEPU");
  customKey = customKeypad.getKey();
  if (customKey) 
  {
    Data[data_count] = customKey; // umieszczamy znak w tablicy
    lcd.setCursor(data_count-1, 1); // przenosimy kursor do miejsca gdzie jest nowy znak

   if (data_count <= 0){
        lcd.print(Data[data_count]);     
   }
  else {
    lcd.print('*'); 
     lcd.print(Data[data_count]);
  }  
    data_count++; // dodajemy do tablicy z  danymi nowy char
  }
  if (data_count == Password_Lenght - 1) 
  {
    if (!strcmp(Data, Master) ||   !strcmp(Data, Master1) ||   !strcmp(Data, Master2)   )  
    {
 
  if (!strcmp(Data, Master)  &&digitalRead(A0)==1) {         //pierwsze haslo 123456
        otwarciedrzwi(); 
  }
 else if (!strcmp(Data, Master1)&&digitalRead(A0)==1 )       //drugie haslo 123457
{    
    brama();
  }
   else if (!strcmp(Data, Master2) &&digitalRead(A0)==1)    //trzecie haslo 123123
{     
lcd.clear();    
if (alarm==0)
{lcd.clear();
lcd.print("UZBROJONO ALARM");
alarm=1;
delay(1000);
}
else{  
lcd.clear();
lcd.print("ROZBROJONO ALARM");
alarm=0;delay(1000);
}  
delay(1000);
 
  }
      else
      {
        lcd.clear();
        lcd.print("BRAK BLUETOOTH");
        delay(1000);
      }
 
    }
    else
    {
      lcd.clear();
      lcd.print("  Zle haslo!");
      delay(1000);
      door = 1;
    }
    clearData();
  }
}
/*---------------------------------------------------------------------------------*/
