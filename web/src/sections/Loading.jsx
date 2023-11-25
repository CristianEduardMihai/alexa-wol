import { useState, useEffect } from "react"

export function Loading(){
  const [ dots, setDots ] = useState(0)
  
  useEffect(()=>{
    const interval = setInterval(()=>{
      setDots((dots)=>{
        if(dots >= 2) return 0
        else return dots + 1
      })
    }, 500)

    return ()=>{
      clearInterval(interval)
    }
  })

  return (
    <div className="flex items-center justify-center w-full h-full bg-background">
      <h2 className="text-2xl">Loading.{".".repeat(dots)}</h2>
    </div>
  )
}
