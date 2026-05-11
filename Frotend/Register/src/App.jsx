import { useState } from 'react'
import moduleName from 'module'
import Regi from './Component/Regi'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
   <>
    <h1>Register</h1>
    <Regi />
   </>
  )
}

export default App
