#!/bin/bash

exec fauxmo -c ./fauxmo/config.json -v &
cd ./api && python3 api.py