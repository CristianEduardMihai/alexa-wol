import powerOnSVG from '../assets/powerOn.svg'
import powerOffSVG from '../assets/powerOff.svg'
import deleteSVG from '../assets/delete.svg'
import { useState } from 'react'
import { getDevice, updateDevice, deleteDevice } from '../util/config'

export function Device({ deviceId }){
  const [isDeleted, setIsDeleted] = useState(false)
  const [data, updateData] = useState(getDevice(deviceId))

  if(!isDeleted) updateDevice(deviceId, data)
  
  const del = () =>{
    deleteDevice(deviceId)
    setIsDeleted(true)
  }

  const INPUT_FIELDS = [
    {
      key: 'ip',
      value: data.ip,
      name: "IP"
    },
    {
      key: 'udp_port',
      value: data.udp_port,
      name: "UDP Port"
    },
    {
      key: 'mac_addr',
      value: data.mac_addr,
      name: "Mac Address"
    },
    {
      key: 'wemo_port',
      value: data.wemo_port,
      name: "Wemo Port"
    },
  ]

  let dataIsValid = true
  dataIsValid = IpIsValid(data.ip) && dataIsValid
  dataIsValid = UdpPortIsValid(data.udp_port) && dataIsValid
  dataIsValid = WemoPortIsValid(data.wemo_port) && dataIsValid
  dataIsValid = MacAddressIsValid(data.mac_addr) && dataIsValid

  return (
    <div className={`flex flex-row gap-3 bg-gray-900 p-6 rounded-lg w-full max-w-full border border-2 ${dataIsValid ? 'border-gray-900' : 'border-red-500'} ${isDeleted ? "opacity-40" : ""}`}>
      <div className="grid grid-cols-[1fr] md:grid-cols-[8rem_1fr_1fr] gap-3 w-full">
        <div className="h-full flex items-center justify-center p-7 md:p-4 row-span-3 md:pr-6">
          <img src={powerOnSVG} className=''/>
        </div>
        <div className="flex items-center justify-center outline outline-[1px] outline-gray-500 py-4 rounded row-span-2">
          <div>
            <input 
              className="text-lg text-center font-medium w-full"
              value={data.name}
              onChange={({target: {value}})=>{
                updateData((data)=>{
                  return {...data, name: value}
                })
              }}/>
          </div>
        </div>
          {
            INPUT_FIELDS.map(({key, value, name})=>{
              return (
                <div className="flex gap-x-2 p-2 rounded outline outline-[1px] outline-gray-500"
                  key={key}>
                  <p className='whitespace-nowrap'>{name} :</p>
                  <input className='w-full' 
                    value={value}
                    onChange={({target: {value}})=>{
                      updateData((data)=>{
                        return {...data, [key]: value}
                      })
                    }}
                  />
                </div>
              )
            })
          }
        </div>
      <button 
        onClick={del}
        className='flex items-center p-4 outline outline-[1px] outline-gray-500 rounded'>
        <img src={deleteSVG}/>
      </button>
    </div>
  )
}

function IpIsValid(ip){
  if(ip.split(".").length !== 4) return false
  if(ip.split(".").filter((str)=>Number.isInteger(Number(str))).length !== 4) return false 
  return true
}

function UdpPortIsValid(udpPort){
  return Number.isInteger(Number(udpPort))
}

function WemoPortIsValid(wemoPort){
  return Number.isInteger(Number(wemoPort))
}

function MacAddressIsValid(macAddress){
  return true 
}
