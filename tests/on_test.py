import requests

url = "http://192.168.0.243:9999/api/devices/device1"

data = {"isOn": 1}

response = requests.put(url, json=data)

if response.status_code == 200:
    print("PUT request successful")
else:
    print("PUT request failed with status code:", response.status_code)
