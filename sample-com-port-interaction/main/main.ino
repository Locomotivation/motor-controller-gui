//-----------------------------------------------------------------------------
// AUTHOR:          Mahyar Mirrashed
// ARDUINO VERSION: Arduino IDE 1.8.13
// BOARD:           Arduino Nano
// DATE:            February 20, 2021
// 
// REMARKS:         Sample COM port program with real-time data.
//-----------------------------------------------------------------------------

//-----------------------------------------------------------------------------
// CONSTANTS
//-----------------------------------------------------------------------------

#define echoPin 2   // attach Arduino pin D2 to HC-SR04 pin Echo
#define trigPin 3   // attach Arduino pin D3 to HC-SR04 pin Trig

//-----------------------------------------------------------------------------
// VARIABLES
//-----------------------------------------------------------------------------

long duration;      // duration of sound wave to travel

void setup()
{
    // set pin modes
    pinMode(echoPin, INPUT);
    pinMode(trigPin, OUTPUT);

    // begin port connection with 9600 baud rate
    Serial.begin(9600);
    Serial.println("Ultrasonic Sensor HC-SR04 Test with Arduino Nano");
}

void loop()
{
    // clear trigger pin condition
    digitalWrite(trigPin, LOW);
    delayMicroseconds(2);

    // set trigger pin high for 10 microseconds
    digitalWrite(trigPin, HIGH);
    delayMicroseconds(10);
    digitalWrite(trigPin, LOW);

    // read echo pin (sound wave travel time in microseconds)
    duration = pulseIn(echoPin, HIGH);

    // calculate and print distance
    Serial.println(duration * 0.034 / 2);
    delay(20);
}
