from wakeonlan import send_magic_packet
from socket import socket, AF_INET, SOCK_DGRAM
import json

config = json.load(open("secrets.json", "r"))

PC_IP   = '192.168.0.100'
PC_PORT_NUMBER = 50000
PC_MAC_ADD = "00-B0-D0-63-C2-26"

offSocket = socket( AF_INET, SOCK_DGRAM )

poweroff_security_key = config["poweroff_key"]

def computer(action):
    if action == 1:
        print("Turning on computer")
        send_magic_packet(PC_MAC_ADD)
    elif action == 0:
        print("Turning off computer")
        offSocket.sendto(f"poweroff-{poweroff_security_key}".encode('utf-8'),(PC_IP,PC_PORT_NUMBER))
    else:
        print("Invalid action")

computer(action)