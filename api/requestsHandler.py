from wakeonlan import send_magic_packet
from socket import socket, AF_INET, SOCK_DGRAM
import json
from pathlib import Path
base_folder = Path(__file__).parent.resolve()

with open(f"{base_folder}/config.json") as f:
    config = json.load(f)

offSocket = socket( AF_INET, SOCK_DGRAM )

poweroff_security_key = config["poweroff_key"]

def run_device_script(device, action):
    try:
        ip = config["devices"][device]["ip"]
        udp_port = config["devices"][device]["udp_port"]
        mac_addr = config["devices"][device]["mac_addr"]

        if action == 1:
            print(f"Turning on {config['devices'][device]['name']}")
            send_magic_packet(mac_addr)
        elif action == 0:
            print(f"Turning off {config['devices'][device]['name']}")
            offSocket.sendto(f"poweroff-{poweroff_security_key}".encode('utf-8'),(ip,udp_port))
        else:
            print("Invalid action")

    except Exception as e:
        print(e)
    

def requestsHandler(device_name : str, body : dict):
    print("Device: " + device_name)
    print("Action: " + str(body))

    run_device_script(device_name.lower(), action=body["isOn"])