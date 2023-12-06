const base_url = import.meta.env.MODE == "development" ? "http://localhost:9999" : ""

let config = {
  devices: [],
  poweroff_key: ""
}

export async function getConfig(){
  const data = await fetch(`${base_url}/api/get_config`)
  const json = await data.json()
  config = json
}

export async function saveConfig(){
  console.log(config)
  return fetch(`${base_url}/api/update_config`, 
    { body: JSON.stringify(config), method: "PUT" })
}

export function DiscardConfig(){
  console.log("Config Discarded")
  location.reload()
}

const newDeviceTemplate = {
    "name": "Name",
    "ip": "192.168.0.1",
    "udp_port": 50000,
    "mac_addr": "00:00:00:00:00:00",
    "wemo_port": 12340
}

export function getDeviceIds(){
  console.log("Getting device ids")
  return [...Object.keys(config['devices'] || {})]
}

function getMissingId(){
  let ids = []
  Object.keys(config['devices']).forEach((id)=>{
    ids.push(parseInt(id.slice(6)))
  })
  
  ids = ids.sort((a, b)=> a - b)

  if(ids[0] !== 1) return 1

  for (let i = 0; i < ids.length -1; i++){
    if(ids[i+1] - ids[i] > 1) return (ids[i] + 1)
  }

  return ids[ids.length-1] + 1
}

export function addDevice(){
  const newDevice = {...newDeviceTemplate}
  newDevice.wemo_port += getMissingId() - 1
  
  config['devices'][`device${getMissingId()}`] = newDevice
}

export function getDevice(id){
  return {...config['devices'][id]}
}

export function updateDevice(id, value){
  console.log("Updating device")
  config['devices'][id] = value
}

export function deleteDevice(deviceId){
  console.log("Deleting device", deviceId)
  delete config['devices'][deviceId]
}

export function getPowerOffKey(){
  return config['poweroff_key']
}

export function setPowerOffKey(key){
  config['poweroff_key'] = key
}
