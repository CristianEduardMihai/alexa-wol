from fastapi import FastAPI, HTTPException, Request
from fastapi.responses import RedirectResponse 
from fastapi.staticfiles import StaticFiles
from fastapi.responses import JSONResponse
import uvicorn
import json
from requestsHandler import requestsHandler
from configUpdater import update_config, get_config, fauxmo_update_on_start

from pathlib import Path
base_folder = Path(__file__).parent.resolve()

# update fauxmo config on start
# for volume mounting
print("Updating fauxmo config...")
config = get_config()
fauxmo_update_on_start(config)
print("Done")

debug = config["debug"]
if debug:
    print("DEBUG MODE ON")

app = FastAPI()

@app.get("/")
def redirect_to_site():
    return RedirectResponse(url="/panel")

@app.put("/api/update_config")
async def config_update(config_data: Request):
    body = await config_data.body()
    body = json.loads(body)
    if debug == True:
        print("=========RECEIVED CONFIG UPDATE=========")
        print(json.dumps(body, indent=4))
    try:
        update_config(body)
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail="Error updating config")

@app.get("/api/get_config")
async def config_get():
    try:
        config = get_config()
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail="Error getting config")
    
    if debug == True:
        print("=========SENDING CONFIG=========")
        print(json.dumps(config, indent=4))
    return config

@app.put("/api/devices/{device_name}")
async def update_switch(device_name: str, switch_data: Request):
    body = await switch_data.body()
    body = json.loads(body)

    if debug == True:
        print("=========RECEIVED SWITCH UPDATE=========")
        print(json.dumps(device_name, indent=4))
        print(json.dumps(body, indent=4))

    try:
        requestsHandler(device_name, body)
    except Exception as e:
        print(e)
        #raise HTTPException(status_code=500, detail="Error updating switch state")
        return {"success": False}
    
    return JSONResponse(status_code=200, content={"success": True})

@app.put("/api/test/{device_name}")
async def test_update_switch(device_name: str, data: dict):
    print(f"Received test switch update for {device_name}: {data}")
    return {"success": True}

app.mount("/panel", StaticFiles(directory=f"{base_folder}/web", html=True), name="static")

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=9999)

