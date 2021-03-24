---
layout: post
current: post
cover: assets/images/tea-arduino.jpg
navigation: True
title: Taste a cup of tea playing with Arduino
date: 2021/03/10
tags: tech
class: post-template
subclass: 'post tag-technology'
author: Gopa-Vasanth
---

I’m Vasanth Gopa, joined d-shop, Bangalore as an Associate Software Developer Intern. I was wondering how people create cool hardware contraptions with Arduino and raspberry-pi, so I thought it would be a nice idea to write on after getting my hands dirty exploring these devices. So, the blog post will be revolving around my experience on these devices over a week.

I recently got a chance to try my hands on Arduino UNO in Tinkercad, a free and simple to use online platform to simulate projects with quick drag and drops.. 

One of the best reasons for choosing Arduino is that you can quickly convert your ideas into a fully working model by simply connecting the required components without any prototyping and soldering. If you are like me, wondering where to start, let me help you make your life simpler through this post. Let’s learn how to work with Arduino from a beginner’s perspective, in a simple form of making a cup of tea! ☕️

Arduino is a combination of open-source software and hardware, It is used for building your hardware innovations easily without prior experience and further ado. It consists of a circuit board and an IDE which is used to write code and install the same to an electronic device. 

### Coffee 🍵 vs Tea ☕️

Many people confuse between an Arduino and a Raspberry-pi, they are like tea and coffee. Arduino is a microcontroller and can execute only one program at once, but raspberry-pi has an OS installed with it called Raspbian, it has the capability to run multiple programs at once hence it’s called a mini computer.


![dream-pic](assets/images/arudino_pi.png)

### Find your favorite tea leaves 🌱

Some people want to make green tea and some other black tea based on their tastes and choices. It’s the same way with the Arduino. Do you know there are many types of Arduinos just like there are different types of tea? Let’s know some of its types and the different purposes they serve 

-    Arduino Uno – the basic model, 
-    LilyPad Arduino – best suited for e-textiles, 
-    Arduino Mega – The Mega can do more of everything, 
-    Arduino Leonardo –  It connects to the computer via micro-B USB cable. 

So you need to choose the type of the Arduino based on our use case. Arduino Uno is the most basic and the preferred one for getting started for newbies.

### Gather requirements 🍴

Sometimes you may require an Arduino along with some other components such as breadboards, jumper wires, sensors, LED wires based on your project. If you want to simulate it online then most of the required items are available on the components section in Tinkercad.

### Light the stove and place a pan 🔥

Arduino knows what to do with its inputs and outputs based on the program that you load onto the board. Arduino programming is also called sketching. This isn’t too difficult and you can easily write a piece of code if you are familiar with C/C++, then connect with your computer, and hack around!. This program is a set of instructions stored in the ROM. You can also program your Arduino in your Windows, Linux or Mac systems, Let’s see how a program syntax looks.

Basic syntax:

```
/* Basic syntax of programming with Ardunio */

#define On 1    //  Assigning constants
#define off 0   //  Assigning constants

int SwitchDefault = 0;  // Assigning value to variable
```

setup function() and loop function() are mandatory functions in all Arduino programs, setup() function is used to initialize settings before the actual program starts executing. The loop() functions keep the program in execution until there is power supply to the board. 

```
void setup() {
  ...
}

void loop() {
  ...
}
```


### Enjoy your hot tea ☕️

By now you’ve got to know some basic introduction about Arduino, their types and writing programs in the Arduino IDE and our tea is also ready! You are now ready to serve the tea and know more about simple projects that can be implemented at your home by following our posts on our d-shop bangalore blogs posts section. I believe you got an understanding about Arduino and how you can make use of it, so you are ready to brainstorm your ideas and give life to your innovations!

### Resources:

- [https://commons.wikimedia.org/wiki/File:Arduino_Uno_-_R3.jpg](https://commons.wikimedia.org/wiki/File:Arduino_Uno_-_R3.jpg)
- [https://commons.wikimedia.org/wiki/File:Raspberry_Pi_4_Model_B_-_Side.jpg](https://commons.wikimedia.org/wiki/File:Raspberry_Pi_4_Model_B_-_Side.jpg)


You can also my article penned down at [https://blogs.sap.com/2021/03/10/taste-a-cup-of-tea-playing-with-arduino/](https://blogs.sap.com/2021/03/10/taste-a-cup-of-tea-playing-with-arduino/).