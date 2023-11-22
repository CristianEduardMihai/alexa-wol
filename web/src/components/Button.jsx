export function Button({type, text, onPress}){
  return (
    <button 
      className={`w-fit px-6 py-3 rounded-full ${type == ButtonTypes.primary ? 'bg-primary' : 'bg-secondary'}`}
      onClick={()=>onPress()}
    >
      {text}
    </button>
  )
}

export const ButtonTypes = {
  'primary': 'primary',
  'secondary': 'secondary'
}
