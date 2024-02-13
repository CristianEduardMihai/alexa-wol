# Alexa-Wake-On-Lan
<img align="right" width=100 src="https://raw.githubusercontent.com/CristianEduardMihai/alexa-wol/main/images/logo.jpg">

## A Fauxmo frontend that facilitates multi-device control via Alexa services by emulating wemo devices, enabling users to turn computers on/off seamlessly using voice commands.

Based on [fauxmo](https://github.com/n8henrie/fauxmo)

### Additional resources
- [Docker Hub link](https://hub.docker.com/r/cristianeduardmihai/alexa-wol)
- [Github Link](https://github.com/CristianEduardMihai/alexa-wol)
- [Install via pi-hosted portainer template](https://pi-hosted.com/)

### Requirements:
- At least one computer capable of WOL
- A home server (could be a raspberry pi) running 24/7
- An amazon echo device

### Installing
- Via docker compose:
```yaml
---
version: "3.7"

volumes:
  alexa-wol:
    name: alexa-wol

services:
  alexa:
    image: cristianeduardmihai/alexa-wol:latest
    container_name: Alexa-WOL
    restart: unless-stopped
    network_mode: host
    environment:
      - TZ=Europe/Bucharest
    volumes:
      - alexa-wol:/alexa/api/config
```

### Configure devices

 - All configuration is done via the web UI. Additional software needs to be installed on all client PCs, see below.
 ![Web UI](https://raw.githubusercontent.com/CristianEduardMihai/alexa-wol/main/images/webui.png)


### Download windows executable

!! This only works if you don't change the default power off key

Download the latest alexa-shutdown.exe from [releases](https://github.com/CristianEduardMihai/alexa-wol/releases/), 

### Compile windows executable (CLIENT PC)

!! Do this if you have any reasons to not use the default poweroff key

- Download the `windows-binary` folder to your windows PC

- Download [rust](https://www.rust-lang.org/tools/install)

- Change `poweroff-securitykey` (line 11 in [main.rs](windows-binary/src/main.rs)) to `poweroff-yourkey`(that you set via the Web UI)

- Compile by running
```
cargo build --release
```

### Run the executable on boot

- Open the windows run menu and type `shell:startup`

- Place the compiled `alexa_shutdown.exe` in the folder

### Setup linux service (CLIENT PC)
- Download the `shutdown.py` file from the `linux-service` folder. Place it in a location you can remember

- Set your shutdown security key on the first line

- Install python packages (yes it should run as root)
```bash
sudo pip3 install sockets
```

- Create systemd services

Make sure to replace PATH with the location of your file.
```bash
printf "Description=Running alexa-shutdown on boot

[Service]
Environment=XDG_RUNTIME_DIR=/run/user/1000
ExecStart=/bin/bash -c 'python3 -u PATH/shutdown.py'
WorkingDirectory=PATH
Restart=always
User=root
[Install]
WantedBy=multi-user.target" > /lib/systemd/system/alexa-shutdown.service
```

- Enable and start services

```bash
sudo systemctl enable alexa-shutdown
sudo systemctl start alexa-shutdown
```


### Add your devices to alexa

Simply say
`Alexa, discover devices`

Alexa should respons with
```
Starting discovery,
...
```

After about a minute, alexa should say
```
I have found and connected X new devices
```

### Support
If you have any questions, feel free to ping `@cristianmihai_` on your [support request](https://discord.com/channels/316245914987528193/1050303549327810591) on [Novaspirit's discord](https://discord.gg/v8dAnFV).