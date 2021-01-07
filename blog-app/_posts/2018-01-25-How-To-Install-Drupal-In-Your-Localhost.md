---
layout: post
current: post
cover: assets/images/drupal_logo.png
navigation: True
title: How to Install Drupal In Your Localhost
date: 2018/01/25
tags: oss drupal
class: post-template
subclass: 'post tag-OpenSource'
author: Gopa-Vasanth
---
How to Install Drupal In Your Localhost?

Hello folks, Today Let’s start contributing to the Open source!  with step by step process

**What is Open Source?**

Open source The term its self is explaining about Open source, The software which is available for free of cost to the developers to modify, learn and for any purpose.

![drupal-1.jpg](assets/images/drupal-1.jpeg)

Yeah, Drupal is also a free and open source Control Management System, It provides back-end framework of mostly all websites It ranges from blogging, govt sites, Music and a lot’s of software backends.


**Prerequisites :**
*    git
*    Lamp
*    Webbrowser
*    Composer
*    Drupal account
*    Drupalladder account

![lamp.jpeg](assets/images/lamp.jpeg)

If you have any of the above please ignore them and follow the remaining steps, mainly check whether you have apache2 server or not If yes leave apache installation, Do not reinstall application’s that may cause you many issues.

**How to build Drupal in our Local system?**

Drupal is built on Apache server. LAMP(Linux, Apache, My-sql, Php) for Linux systems and XAMPP for Windows, Drupal works on all PHP versions but recommended version is 7.0.


**Let’s start building! #In Ubuntu**

Before starting building we have to know why we are building ? for this my response is we are building in our system to verify our modifications by hosting in our local system. Before submitting patches we have to verify in our localhost if it is working perfectly then we can make a patch. So whatever the changes are done in our core folder that only effects our local-build so don’t worry about any minor mistakes we can easily modify.

At first, we have to install LAMP, there are many ways to install LAMP one of the recommended way is to install LAMP in one command

`sudo apt-get install lamp-server^ phpmyadmin`

This will install Apache, My-sql, Php in your system so no need to install all them individually.Then have to start Apache server in our system

`sudo service apache2 start`

This command will starts Apache server in your system, The very next thing is to navigate to /var/www/html (#Linux Users)

`cd /var/www/html`

This will takes you to `/var/www/html` folder

We can’t access copy, paste into this folder as this is highly encrypted so we have to give permission to access changes here by the following command

`sudo chown -R <username> /var/www/html`

Now we have to clone the core of drupal8, So we usually clone through git

`git clone --branch 8.0.x http://git.drupal.org/project/drupal.git drupal`

This will clone in to your /var/www/html ,As because we will host from `/var/www/html`

Then we have to go into the Drupal folder and have to install composer if you already have composer then you have to update it by installing Drupal

`sudo apt install composer`
`composer update`

The composer should be installed perfectly and update perfectly this will takes a lot of time 7-8 min so we have to wait with patience don’t interrupt in the middle as it will corrupt your files.

Then you have to go to `/var/www/html/sites/default/` then copy default.settings.php and make it settings.php and paste it there.

`cd /var/www/html/drupal8/sites/default`

then go to the `localhost/phpmyadmin/` and click database on the top left and Enter name of your new database as ‘drupal8’  and select utf8 Unicode from drop-down box and then create a database and then setup SQL password for the root ,Now we all ready do set Drupal  o your local host so navigate to `localhost/Drupal` in your browser

![drupal-2.png](assets/images/drupal-2.png)

Now you have to go to the localhost/Drupal and then set up all your database. So that Now your local-host is all set, All the best for your further contribution to Open source, Happy Hacking!!!

 