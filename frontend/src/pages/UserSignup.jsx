import React, { useContext, useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { UserDataContext } from "../context/UserContext.jsx"

const UserSignup = () => {

  const navigate = useNavigate()
  const { user, setUser } = useContext(UserDataContext)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstname] = useState('')
  const [lastName, setLastname] = useState('')
  const [userData, setUserData] = useState('')

  const submitHandler = async (e) => {
    e.preventDefault()
    const newUser = {
      fullname: {
        firstname: firstName,
        lastname: lastName
      },
      email: email,
      password: password
    }

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, newUser)

    if (response.status === 201) {
      const data = response.data
      setUser(data.user)
      localStorage.setItem('token', data.token)
      navigate('/home')
    }

    setEmail('')
    setFirstname('')
    setPassword('')
    setLastname('')
  }


  return (
    <div>
      <div className="p-7 h-screen flex flex-col justify-between">
        <div>
          <img className='w-16 mb-10' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYQy-OIkA6In0fTvVwZADPmFFibjmszu2A0g&s" alt="" />

          <form onSubmit={(e) => submitHandler(e)}>

            <h3 className="text-lg w-1/2 font-medium mb-2">
              What's your name
            </h3>
            <div className="flex gap-4 mb-7">
              <input
                required
                className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border  text-lg placeholder:text-base'
                type='text'
                placeholder='First name'
                value={firstName}
                onChange={(e) => setFirstname(e.target.value)}
              />
              <input
                required
                className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border  text-lg placeholder:text-base'
                type='text'
                placeholder='last name'
                value={lastName}
                onChange={(e) => setLastname(e.target.value)}
              />
            </div>

            <h3 className='text-lg font-medium mb-2'>What's your email</h3>
            <input
              required
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border  text-lg placeholder:text-base'
              type='email'
              placeholder='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <h3 className='text-lg font-medium mb-2'>Enter Password</h3>
            <input
              required type='password'
              className='bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base'
              placeholder='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              className='bg-[#111] text-white font-semibold mb-3 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base'
            >
              Create account
            </button>

          </form>

          <p className="text-center">Already have an account? <Link to={'/login'} className='text-blue-600'>Login here</Link></p>
        </div>
        <div>
          <p className='text-[10px] leading-tight'>
            This site is protected by reCAPTCHA and the <span className='underline'>Google Privacy
              Policy</span> and <span className='underline'>Terms of Service apply</span>.</p>
        </div>
      </div>
    </div>
  )
}

export default UserSignup