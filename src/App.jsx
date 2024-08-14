import { Input } from 'postcss'
import { useState, useCallback, useEffect,useRef } from 'react'



function App() {
  const [length, setLength] = useState(8)
  const [numbers, setNumber] = useState(false)
  const [character, setCharacter] = useState(false)
  const [passward, setPassward] = useState("")

  const passwardGenrator = useCallback(()=>{
let pass = ""
let str =
 "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
 if(numbers)str += "0123456789"
 if(character)str += "!@£$%^&*(){}[]?<>#"

 for (let i = 1; i <= length; i++) {
  let char = Math.floor(Math.random() * str.length + 1)
  pass += str.charAt(char)
 }
setPassward(pass)
  },[length,numbers,character,])

  useEffect(()=>{passwardGenrator()},[length,numbers,character,passwardGenrator])

  // useRef hook
  const passwordRef = useRef(null)
   const copyPasswordToClipbord = useCallback(()=>{
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0,20)
    window.navigator.clipboard.writeText(passward)

   },[passward])
  return (
    <>
     <div className="w-full max-w-md mx-auto shadow-md rounded-lg py-4 px-4 my-8 text-orange-700 bg-gray-700">
      <h1 className="text-white text-center mb-3">Passward Genrator</h1>
      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input 
        type="text"
        value={passward}
       className='outline-none w-full py-2 px-3'
        placeholder='passward'
        readOnly
        ref={passwordRef}
        />
        <button
        onClick={copyPasswordToClipbord}
        className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'
        >copy</button>
      
      </div>
      <div className="flex text-sm gap-x-2">
        <div className="flex items-center gap-x-1">
          <input
           type="range"
           min={10}
           max={40}
           value={length}
           className='cursor-pointer'
           onChange={(e) =>{setLength(e.target.value)}}
           />
           <label>Length:{length}</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input 
          type="checkbox" 
          defaultChecked={numbers}
          id='numberInput'
          onChange={()=>{
            setNumber((prev) => !prev);
          }}
          />
          <label>Numbers</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input 
          type="checkbox" 
          defaultChecked={character}
          id='characterInput'
          onChange={()=>{
            setCharacter((prev) => !prev);
          }}
          />
          <label>characters</label>
        </div>
      </div>
      
      </div>
    </>
  )
}

export default App
