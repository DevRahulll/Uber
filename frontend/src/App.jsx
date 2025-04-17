import React from 'react'
import { Route, Routes } from "react-router-dom"
import UserLogin from './pages/UserLogin'
import UserSignup from './pages/UserSignup'
import Start from './pages/Start'
import CaptainLogin from './pages/CaptainLogin.jsx'
import CaptainSignup from "./pages/CaptainSignup.jsx"
import UserProtectWrapper from "./pages/UserProtectWrapper.jsx"
import Home from './pages/Home.jsx'
import CaptainProtectWrapper from "./pages/CaptainProtectWrapper.jsx"
import CaptainHome from './pages/CaptainHome.jsx'
import UserLogout from "./pages/UserLogout.jsx"
import CaptainLogout from "./pages/UserLogout.jsx"
import Riding from "./pages/Riding.jsx"
import CaptainRiding from "./pages/CaptainRiding.jsx"
import 'remixicon/fonts/remixicon.css'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Start />} />
        <Route path='/login' element={<UserLogin />} />
        <Route path='/signup' element={<UserSignup />} />
        <Route path='/riding' element={<Riding/>}/>


        <Route path='/captain-login' element={<CaptainLogin />} />
        <Route path='/captain-signup' element={<CaptainSignup />} />
        <Route path='/captain-riding' element={<CaptainRiding/>}/>

        <Route path='/home'
          element={
            <UserProtectWrapper>
              <Home />
            </UserProtectWrapper>
          }
        />
        <Route path='/user/logout'
          element={
            <UserProtectWrapper>
              <UserLogout />
            </UserProtectWrapper>
          }
        />
        <Route path='/captain-home' element={
          <CaptainProtectWrapper>
            <CaptainHome />
          </CaptainProtectWrapper>
        } />
        <Route path='/captain/logout' element={
          <CaptainProtectWrapper>
            <CaptainLogout />
          </CaptainProtectWrapper>
        } />

      </Routes>
    </div>
  )
}

export default App