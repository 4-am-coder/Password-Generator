import { useCallback, useEffect, useState } from 'react'

import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [numAllowed, setNumAllowed] = useState(false)
  const [charAllowed, setCharAllowed]= useState(false)
  const [password, setPassword] = useState("")
  const passwordGenerator = useCallback(()=>{
    let pass =""
    let str ="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numAllowed) str+= "1234567890"
    if(charAllowed) str+="!@#$%^&*(){}[];:?"
    for(let i=1; i<length; i++){
      pass+= str.charAt(Math.floor(Math.random()*str.length +1));
    }
    setPassword(pass)
  }, [length, numAllowed, charAllowed, setPassword])
  const copyPass = useCallback(()=>{
    window.navigator.clipboard.writeText(password)
    alert("Password Copied!")
  }, [password])
  useEffect(()=>{ passwordGenerator() }, [length, numAllowed, charAllowed, passwordGenerator])
  return (
    <div className='container'>
      <h1>Password Generator</h1>
      <div>
        <div className='small-container'>
          <input type="text"
            readOnly
            placeholder='Password'
            id='pass'
            value={password}
          />
          <button id='copy' onClick={copyPass}>Copy</button>
        </div>
      </div>
      <div className='small-container'>
        <input type="range" min={6} max={100} value={length} id='len' onChange={(e)=> {setLength(e.target.value)}} />
        <label htmlFor="len">Length: {length}</label>
        <input type="checkbox" id='numbers' defaultChecked={numAllowed} onChange={()=>{setNumAllowed((prev)=> !prev);}} />
        <label htmlFor="numbers">Numbers</label>
        <input type="checkbox" id='chars' defaultChecked={charAllowed} onChange={()=>{setCharAllowed((prev)=> !prev);}} />
        <label htmlFor="chars">Characters</label>
      </div>
    </div>
  )
}

export default App
