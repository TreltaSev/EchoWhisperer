# EchoWhisperer (Main) v0.0.1 

### A up-to-date process logger for easy use and bragging rights for WINDOWS.
Echo Whisperer is a commandline/gui application that simply logs the amount 
of time you spend on a single application.
all processes are logged and you choose which ones can be favorited or are applications.

![screenshot:v0.0.1](screenshots/v0.0.1-large.png)

<div style="height:20px"></div>


# Installation
You can simply download the latest version and run the installer however if you want to develop using this shit for brains code then clone the repository or download the source code manually. 

<div style="height:20px"></div>

# Development
For development if you choose to use my *big bran code* you can simply clone the respository or download the files manuually like you normally would. after that you just gotta run a few commands to start coding in this shit code. for c++ you need to actually compile the program, the command for that is
```bash
cd "./c++" && g++ -o main.exe -I"./include" ./src/main.cpp -lws2_32
```
for the electron part its quite simple, you just need to run these commands from the root of the project
```bash
cd "./electron" && npm install && npm run dev:refresh
```
> ###### npm run dev:refresh expands to webpack and electron .

<div style="height:20px"></div>

# Security

>**Is this at all secure?**
>
>Fuck no, this isn't secure at all, I mean kinda... there arent
>any vulnerabilities as far as im aware but the connection between
>the gui and the c++ logger isn't secure at all, using ws instead of wss. but 
>that doesn't really matter unless someone wanted to know how much time you spent on your apps.
>all they would have to do is target a specific port with a specific request.
