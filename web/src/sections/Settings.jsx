export function Settings(){
  return (
    <div className="flex flex-col gap-4 p-6">
      <h2 className="text-xl">Settings</h2>
      <div className="flex flex-col gap-4 bg-gray-900 rounded-lg p-6">
        <p className="whitespace-nowrap">Power Off Key</p>
        <input className="outline outline-[1px] outline-gray-500 rounded p-2"/>
      </div>     
    </div>
  )
}
