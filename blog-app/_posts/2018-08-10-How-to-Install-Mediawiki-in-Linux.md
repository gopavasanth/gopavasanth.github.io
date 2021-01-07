---
layout: post
current: post
cover: assets/images/mediawiki.png
navigation: True
title: How to Install MediaWiki in Linux?
date: 2018/08/10
tags: oss mediawiki
class: post-template
subclass: 'post tag-OpenSource'
author: Gopa-Vasanth
---
How to Install MediaWiki in Linux?

Dear friends, I’m very happy to see you here, Thank’s for your interest. Let’s start contributing to mediawiki software. Please follow all these steps and do not skip any of the steps, all this process can be completed  in half an hour, In case if you encounter with any errors you can contact me or post a comment in this blogpost anytime,  I will try my best to give provide a  very quick reply.

#### 1. Install LAMP server

Very first and basic step to Install LAMP server for mediawiki localhost setup. you can install LAMP using this below command. 

![lamp.jpeg](assets/images/lamp.jpeg)

`sudo apt install lamp-server^` 

#### 2. Installation and Configuration of Git

If you have already installed git you can skip this step, if not please install git using this command.

![git.png](assets/images/git.png)

`sudo apt-get install git`

Now we have installed git ^ ^ we have to configure it using our personal information, Check you git email-id and username using this commnd.

`git config -l`

If you wants to change your email  or username, you can reset using these command.

` git config --global user.email "example@example.com"`

` git config --global user.name "example"`

#### 3. Setting up SSH keys in Gerrit

SSH keys are set up to establish a secure connection to our computer and Gerrit. To make sure whether you need to generate a brand new key, you need to check if one already exists. List the files in your .ssh directory (if you have one):

`ls ~/.ssh`

If you see a file id_rsa.pub here you may skip to step – 4.
To generate a new SSH key

`ssh-keygen -t rsa -C "your_email_id@gmail.com"`

#### 4. Add your SSH key

Open your public key file with any text editor and copy your SSH key exactly as it is written without modifying it. Copy the full text, including the “ssh-rsa” prefix, the key itself, and the email address.

`cat ~/.ssh/id_rsa.pub`

#### 5. Add SSH key to use with Git

Get ssh-agent

`eval ssh-agent`

Add your private key to the agent

`ssh-add .ssh/id_rsa`

Configure your settings accurately and give your user-id and email-id as per you registered in gerrit profile. You can check it in your gerrit by going into settings and then to Profile

`ssh -p 29418 <username>@gerrit.wikimedia.org`

#### 6. Download and Install Mediawiki code base

You can download the mediawiki Core code base using git.

`git clone ssh://<username>@gerrit.wikimedia.org:29418/mediawiki/core.git`

If you download the zip file unzip the MediaWiki-1.31.0 Using this command

`tar xvzf mediawiki-*.tar.gz`

Now delete the zip file

`rm -r mediawiki-1.31.0.tar.gz`

renaming the mediaWiki-1.31.0 to core
`mv mediaWiki-1.31.0 core`

Now copy your core folder to your `/var/www/html/`

`cd /var/www/`

For this you have to give the read and write permissions, You can give these permissions using the following command

`sudo chmod -R 777 /var/www/html`

Go to your `localhost/core/` and set up your database.

After Completing your configuration of database You will receive Localsettings.php file copy that file to the core folder.

If that’s Done, we have completed the setting up our system ready for the mediawiki Contribution. Let’s hack through the wiki code.