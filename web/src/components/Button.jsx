import {Loading} from "../assets/Loading"
import TickSvg from "../assets/tick.svg"

export function Button({type, text, onPress, state}){
  return (
    <button 
      className={`h-12 w-32 flex items-center justify-center rounded-full ${type == ButtonTypes.primary ? 'bg-primary' : 'bg-gray-200'}`}
      onClick={()=>onPress()}
    >
      {
        (()=>{
          switch(state){
            case ButtonStates.saving:
              return (
                <Loading/>
              )
            case ButtonStates.saved:
              return (
                <img src={TickSvg}/>
              )
            default:
              return (
                <a>{text}</a>
              )
          }
        })()
      }
    </button>
  )
}

export const ButtonTypes = {
  'primary': 'primary',
  'secondary': 'secondary'
}

export const ButtonStates = {
  save: 0,
  saving: 1,
  saved: 2
}

