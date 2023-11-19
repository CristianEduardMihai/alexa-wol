# ALEXA-WAKE-ON-LAN
## A server program that allows you to turn computers on/off using Alexa services by emulating wemo devices
Based on [fauxmo](https://github.com/n8henrie/fauxmo)

### Requirements:
- At least one computer capable WOL
- A home server (could be a raspberry pi) running 24/7
- An amazon echo device

### Installing
- Clone this repo to your home server

```bash
git clone https://github.com/CristianEduardMihai/alexa-wol
```

- Install API requirements using pip
```bash
cd api/
pip3 install -r requirements.txt
cd ..
```

- Install fauxmo venv and requirements
```bash
cd fauxmo/
python3 -m venv .venv
source ./.venv/bin/activate
pip3 install -r requirements.txt
```

- Create systemd services

Make sure to replace PATH with the root of your install folder(where you cloned the repo). For example, `/home/user/alexa-wol/`
```bash
# API service
printf "Description=Running HOME-API on boot

[Service]
Environment=XDG_RUNTIME_DIR=/run/user/1000
ExecStart=/bin/bash -c 'python3 -u PATH/api/api.py'
WorkingDirectory=PATH/api
Restart=always
User=$(whoami)
[Install]
WantedBy=multi-user.target" > /lib/systemd/system/api.service

# Fauxmo service
printf "[Unit]
Description=Fauxmo
After=network-online.target
Wants=network-online.target

[Service]
Type=simple
WorkingDirectory=PATH/famuxo
# Fix the paths below:
ExecStart=PATH/famuxo/.venv/bin/fauxmo -c PATH/famuxo/config.json -v
Restart=on-failure
RestartSec=10s
User=$(whoami)

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

### Configure devices

 - Recommended: Change the shutdown password in `api/secrets.json`

 - Fill out PC_IP, PC_PORT_NUMBER and PC_MAC_ADD in `api/devices/computer_example.py`. You can add as many devices as you want by copying the file.

 - The example device should already be added to `fauxmo/config.json`, for any additional devices you can copy and modify(on_cmd, off_cmd, name) this json example:
 ```json
    {
        "port": 12341,
        "on_cmd": "http://127.0.0.1:9999/devices/DEVICE_FILENAME",
        "off_cmd": "http://127.0.0.1:9999/devices/DEVICE_FILENAME",
        "on_data": "{\"isOn\": 1}",
        "off_data": "{\"isOn\": 0}",
        "method": "PUT",
        "name": "DEVICE NAME (SEEN BY ALEXA)",
        "use_fake_state": true
    }
 ```
!! Make sure to add 1 to the `port` section for each device, for example

Device 1: Port 12340

Device 2: Port 12341

Device 3: Port 12342

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