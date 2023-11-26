# Alexa-Wake-On-Lan
## A server program that allows you to turn computers on/off using Alexa services by emulating wemo devices
Based on [fauxmo](https://github.com/n8henrie/fauxmo)

### Requirements:
- At least one computer capable of WOL
- A home server (could be a raspberry pi) running 24/7
- An amazon echo device

### Installing
- Clone this repo to your home server

```bash
git clone https://github.com/CristianEduardMihai/alexa-wol
cd alexa-wol
```

- Install requirements using pip
```bash
pip3 install -r requirements.txt
```

- Create systemd services

Make sure to replace PATH with the root of your install folder(where you cloned the repo). For example, `/home/user/alexa-wol/`

Make sure to replace USER with your current user(not root)
```bash
# API service
printf "Description=Running HOME-API on boot

[Service]
Environment=XDG_RUNTIME_DIR=/run/user/1000
ExecStart=/bin/bash -c 'python3 -u PATH/api/api.py'
WorkingDirectory=PATH/api
Restart=always
User=USER
[Install]
WantedBy=multi-user.target" > /lib/systemd/system/api.service

# Fauxmo service
printf "[Unit]
Description=Fauxmo
After=network-online.target
Wants=network-online.target

[Service]
Type=simple
ExecStart=fauxmo -c PATH/fauxmo/config.json -v
WorkingDirectory=PATH/fauxmo
Restart=on-failure
RestartSec=10s
User=USER

[Install]
WantedBy=multi-user.target" > /etc/systemd/system/fauxmo.service
```

- Enable and start services
```bash
sudo systemctl enable api
sudo systemctl enable fauxmo

sudo systemctl start api
sudo systemctl start fauxmo
```

- Allow current user to restart services
```bash
sudo visudo
```
Under `# User privilege specification`, add the following, replace USER with your current non-root user
```
USER cms051=/usr/bin/systemctl restart fauxmo.service
USER cms051=/usr/bin/systemctl restart api.service
```
Should look like this:

![Permissions](images/user_permissions.png)

### Configure devices

 - All configuration is done via the web ui.
 ![Web UI](images/webui.png)

### Compile windows binary (CLIENT PC)
- Download the `windows-binary` folder to your windows PC

- Download [rust](https://www.rust-lang.org/tools/install)

- Change `poweroff-securitykey` to `poweroff-yourkey`(that you puy in `api/secrets.json` in the previous step)

- Compile by double clicking `compile.bat` or running
```
rustc --target=x86_64-pc-windows-msvc --edition=2021 -o alexa_shutdown.exe shutdown.rs --crate-type bin
```
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
After configuring everything, please restart your services
```bash
sudo systemctl restart api
sudo systemctl restart fauxmo
```

The, simply say
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