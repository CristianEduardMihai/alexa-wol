import {useState} from "react";
import { Button, ButtonTypes } from "../components/Button";
import { Device } from "../components/Device";

import { getDeviceIds, addDevice } from "../util/config";

export function DeviceList(){
  const [ deviceIds, setDeviceIds ] = useState(getDeviceIds())

  const refreshDeviceList = () =>{
    setDeviceIds(getDeviceIds())
  }

  return (
    <div className="max-h-full grid grid-rows-[auto_1fr_auto] gap-4 w-full p-4 pr-0 md:p-8">
      <h2 className="text-xl font-medium">Devices</h2>
      <div className="flex flex-col gap-4 max-h-full overflow-y-scroll pr-4 md:pr-6">
        {
          deviceIds.map((deviceId)=>{
            return (
              <Device deviceId={deviceId} key={deviceId} refreshDeviceList={refreshDeviceList}/>
            )
          })
        }
      </div>
      <Button 
        type={ButtonTypes.primary} 
        text='Add Device' 
        onPress={()=>{
          addDevice()
          console.log(getDeviceIds())
          setDeviceIds([...getDeviceIds()])
        }}
      />
    </div>
  )
}
