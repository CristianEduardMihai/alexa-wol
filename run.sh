#!/bin/bash

while true; do
    fauxmo -c ./fauxmo/config.json -v & # start fauxmo
    python3 ./api/api.py # start api, remain here untill api.py exits
    pkill -f fauxmo # kill fauxmo
    sleep 0.1
done
