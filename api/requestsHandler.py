import os
import json
from pathlib import Path
base_folder = Path(__file__).parent.resolve()

def run_device_script(device, action):
    try:
        with open(f'{base_folder}/devices/{device}.py', 'r') as file:
            globals()["action"] = action
            exec(file.read(), globals())
    except FileNotFoundError as e:
        #print(e)
        print(f'Error: The file devices/{device}.py was not found.')


def requestsHandler(device_name : str, body : dict):
    print("Device: " + device_name)
    print("Action: " + str(body))

    run_device_script(device_name.lower(), action=body["isOn"])