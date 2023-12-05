import { useState, useEffect } from "react"

import { DeviceList } from "./sections/DeviceList"
import { Settings } from "./sections/Settings"

import { getConfig } from "./util/config"
import {Loading} from "./sections/Loading"

const Status = {
  loaded: true,
  loading: false
}

function App() {  
  const [ status, setStatus ] = useState(Status.loading)

  useEffect(()=>{
    getConfig().then(()=>{
      console.log("Config Loaded")
      setStatus(Status.loaded)
    })
  }, [])

  if( status == Status.loading){
    return (
      <div className="h-screen">
        <Loading/>
      </div>
    )
  }

  return (
    <div className="flex flex-col lg:flex-row h-screen overflow-x-scroll md:overflow-hidden bg-background">
      <div className="h-full lg:w-8/12">
        <DeviceList />
      </div>
      <div className="lg:w-4/12">
        <Settings/> 
      </div>
    </div>   
  )
}

export default App
