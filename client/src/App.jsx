import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Button } from './components/ui/button'
import LogIn from './pages/login'
// import { LogIn } from 'lucide-react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <Button>Let's Build Lms</Button>
     <LogIn/>
    </>
  )
}

export default App
