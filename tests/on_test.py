import requests

url = "http://127.0.0.1:9999/api/devices/device1"

data = {"isOn": 1}

response = requests.put(url, json=data)

if response.status_code == 200:
    print("PUT request successful")
else:
    print("PUT request failed with status code:", response.status_code)
