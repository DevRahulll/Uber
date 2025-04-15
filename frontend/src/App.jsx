import React from 'react'
import { Route, Routes } from "react-router-dom"
import UserLogin from './pages/UserLogin'
import UserSignup from './pages/UserSignup'
import Start from './pages/Start'
import CaptainLogin from './pages/CaptainLogin.jsx'
import CaptainSignup from "./pages/CaptainSignup.jsx"

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Start />} />
        <Route path='/login' element={<UserLogin />} />
        <Route path='/signup' element={<UserSignup />} />
        <Route path='/captain-login' element={<CaptainLogin />} />
        <Route path='/captain-signup' element={<CaptainSignup />} />
      </Routes>
    </div>
  )
}

export default App