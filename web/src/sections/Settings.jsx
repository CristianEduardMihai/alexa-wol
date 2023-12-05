import { useState } from 'react'

import { Button, ButtonStates, ButtonTypes } from '../components/Button'
import { getPowerOffKey, saveConfig, setPowerOffKey } from '../util/config'
import {useReducer} from 'react'

export function Settings(){
  const [ buttonState, setButtonState ] = useState(ButtonStates.save)
  const [ inputIsHidden, toggleInputState ] = useReducer((state)=>!state, true)
  return (
    <div className="h-full flex flex-col justify-between gap-4 p-6 pb-14">
      <div className='flex flex-col gap-4'>
        <h2 className="text-xl font-medium">Settings</h2>
        <div className="flex flex-col gap-4 bg-gray-900 rounded-lg p-6">
          <p className="whitespace-nowrap">Power Off Key</p>
          <div className='flex outline outline-[1px] outline-gray-500 rounded pr-4'>
            <input 
              className='w-full p-2'
              defaultValue={getPowerOffKey()}
              onChange={({target: { value }})=>{
                setPowerOffKey(value)
              }}
              type={inputIsHidden ? "password": ""}/>
            <button className='text-sm' onClick={()=>{
              toggleInputState()
            }}>Show</button>
          </div>
        </div> 
      </div>
      <div className='flex gap-2'>
        <Button type={ButtonTypes.primary} 
          text="Save"
          state={buttonState}
          onPress={async ()=>{
            setButtonState(ButtonStates.saving)
            try {
              await saveConfig()
              setButtonState(ButtonStates.saved)
              setTimeout(()=>{
                location.reload()
              }, 2000)
            } catch {
              setButtonState(ButtonStates.save)
            }
          }}
        /> 
        <Button type={ButtonTypes.secondary} 
          text="Discard"
          onPress={()=>{
            location.reload()
          }}
        /> 
      </div>
    </div>
  )
}
