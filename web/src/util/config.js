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
}

const newDeviceTemplate = {
    "name": "Computer",
    "ip": "192.168.0.1",
    "udp_port": 0,
    "mac_addr": "00:00:00:69:00:00",
    "wemo_port": 12340
}

export function getDeviceIds(){
  console.log("Getting device ids")
  return [...Object.keys(config['devices'] || {})]
}

export function addDevice(){
  const newDevice = {...newDeviceTemplate}
  newDevice.wemo_port += Object.keys(config.devices).length
  
  config['devices'][`device${Object.keys(config.devices).length + 1}`] = newDevice
}

export function getDevice(id){
  return {...config['devices'][id]}
}

export function updateDevice(id, value){
  console.log("Updating device")
  config['devices'][id] = value
}

export function getPowerOffKey(){
  return config['poweroff_key']
}

export function setPowerOffKey(key){
  config['poweroff_key'] = key
}
