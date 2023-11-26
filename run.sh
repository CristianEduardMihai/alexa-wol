#!/bin/bash

exec fauxmo -c ./fauxmo/config.json -v &
cd ./api && exec python3 api.py