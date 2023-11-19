from fastapi import FastAPI, HTTPException, Request
import uvicorn
import json
from requestsHandler import requestsHandler

app = FastAPI()

@app.put("/devices/{device_name}")
async def update_switch(device_name: str, switch_data: Request):
    body = await switch_data.body()
    body = json.loads(body)

    ##print(body)
    ##print(device_name)

    try:
        requestsHandler(device_name, body)
    except Exception as e:
        print(e)
        #raise HTTPException(status_code=500, detail="Error updating switch state")
        return {"success": False}
    
    return {"success": True}

@app.put("/test/{device_name}")
async def test_update_switch(device_name: str, data: dict):
    print(f"Received test switch update for {device_name}: {data}")
    return {"success": True}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=9999)
