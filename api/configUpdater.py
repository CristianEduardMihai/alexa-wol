import json
from pathlib import Path
base_folder = Path(__file__).parent.resolve()

def re_id_devices(config):
    new_config = {}
    counter = 1
    for device in config["devices"].items():
        new_device_id = f"device{counter}"
        new_config[new_device_id] = device[1]
        counter += 1
    config["devices"] = new_config
    return config

def generate_fauxmo_config(config):
    fauxmo_config = {
        "FAUXMO": {
            "ip_address": "auto"
        },
        "PLUGINS": {
            "SimpleHTTPPlugin": {
                "DEVICES": []
            }
        }
    }

    for device_id, device_info in config["devices"].items():
        fauxmo_device = {
            "port": device_info["wemo_port"],
            "on_cmd": f"http://127.0.0.1:9999/api/devices/{device_id}",
            "off_cmd": f"http://127.0.0.1:9999/api/devices/{device_id}",
            "on_data": '{"isOn": 1}',
            "off_data": '{"isOn": 0}',
            "method": "PUT",
            "name": device_info["name"],
            "use_fake_state": True
        }

        fauxmo_config["PLUGINS"]["SimpleHTTPPlugin"]["DEVICES"].append(fauxmo_device)

    return fauxmo_config

def update_config(dict):
    print("Updating config...")
    dict = re_id_devices(dict)
    with open(f"{base_folder}/config/config.json", "w") as f:
        json.dump(dict, f, indent=4)
    # get fauxmo config
    fauxmo_config = generate_fauxmo_config(dict)

    # write to fauxmo config. The config file is located one folder up from the api folder, in the fauxmo folder
    with open(f"{base_folder.parent}/fauxmo/config.json", "w") as f:
        json.dump(fauxmo_config, f, indent=4)
    
    # Restart script
    import os
    os.system("pkill python3")

def fauxmo_update_on_start(dict):
    fauxmo_config = generate_fauxmo_config(dict)
    with open(f"{base_folder.parent}/fauxmo/config.json", "w") as f:
        json.dump(fauxmo_config, f, indent=4)

def get_config():
    with open(f"{base_folder}/config/config.json") as f:
        config = json.load(f)
    return config