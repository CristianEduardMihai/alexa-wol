import requests

url = "http://127.0.0.1:9999/api/update_config"
body = {
    "poweroff_key": "securitykey_dsadsasadas",
    "devices": {
        "device1": {
            "name": "Computerawawsad",
            "ip": "192.168.0.123",
            "udp_port": 50000,
            "mac_addr": "00:00:00:00:55:60",
            "wemo_port": 12340
        },
        "device2": {
            "name": "Laptop",
            "ip": "192.168.0.132",
            "udp_port": 50000,
            "mac_addr": "00:00:00:00:00:00",
            "wemo_port": 12340
        }
    }
}

response = requests.put(url, json=body)

if response.status_code == 200:
    print("PUT request successful")
else:
    print("PUT request failed with status code:", response.status_code)