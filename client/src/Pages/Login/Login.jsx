import React, { useState } from 'react'
import login from './login.module.css'
import Props from '../../Props/Props'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useNavigate, useLocation } from 'react-router-dom'

const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState({})
    const [success, setSuccess] = useState('')
    const [apiError, setApiError] = useState('')
    const [rememberMe, setRememberMe] = useState(false)

    const navigate = useNavigate()
    const location = useLocation()
    
    const validate = () => {

      const newError = {}

      if (!email.trim()) {
        newError.email = 'Email Address is Required'
      }
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        newError.email = 'Invalid Email Address'
      }

      if (!password.trim()) {
        newError.password = 'Password is Required'
      }
      else if (password.length < 8) {
        newError.password = 'Password must contain minimum 8 characters'
      }

      setError(newError)
      return Object.keys(newError).length === 0
    
    }

    const handleSubmit = async() => {
      if(validate()) {
        setError({})
        setSuccess('')
        setApiError('')
        try {
          const payload = {
            email : email,
            password : password 
          }
          const response = await axios.post(`https://furniture-e-commerce-website.onrender.com/api/users/login`, payload)
          alert(response.data.message)
          setSuccess(response.data.message)
          if (rememberMe) {
            localStorage.setItem("token", response.data.token)
            localStorage.setItem("email", response.data.user.email)
          }
          else {
            sessionStorage.setItem("token", response.data.token)
            sessionStorage.setItem("email", response.data.user.email)
          }
          navigate(location.state?.from || "/")
          setEmail('')
          setPassword('')
          setRememberMe(false)
        }
        catch (error) {
          setSuccess('')
          setApiError(error.response.data.message)
          console.log(error)
        }
      }
      else {
        setSuccess('')
      }

    }

  return (
    <>
    <div className={login.container}>
      <h1>LOGIN</h1>
      <div className={login.loginform}>
        <h2>LOGIN</h2>
        <div className={login.main}>
          <input type="text" placeholder='Email Address *Required' value={email} onChange={(e) => setEmail(e.target.value)} 
            className={`${login.textbox} ${error.email ? login.errorinput : ''}`} />
          {error.email && (<p style={{ fontSize: '12px', color: 'red' }}>{error.email}</p>)}
        </div>
         <div className={login.main}>
          <input type="text" placeholder='Password *Required' value={password} onChange={(e) => setPassword(e.target.value)} 
            className={`${login.textbox} ${error.password ? login.errorinput : ''}`} />
          {error.password && (<p style={{ fontSize: '12px', color: 'red' }}>{error.password}</p>)}
          {apiError && (<p style={{ fontSize: '12px', color: 'red' }}>{apiError}</p>)}
          {success && (<p style={{ fontSize: '12px', color: 'green' }}>{success}</p>)}
        </div>
        <Link to={'/reset'}>
          <h6>Lost your password?</h6>
        </Link>
        <div className={login.remember}>
          <input type="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)}/>
          <span>  Remember Me</span>
        </div>
        <div className={login.btn}>
          <Props content={'LOG IN'} fsize={'15px'} font={'var(--primary-font)'} bgcolor={'var(--second-color)'} 
                col={'var(--third-color)'} bord={'none'} rad={'0'} pad={'10px 23px'} 
                hbg={'var(--first-color)'} cursor={'pointer'} trans={'0.4s'} oncl={handleSubmit}
          />
        </div>
        <Link to={'/signup'} style={{display: 'block', width: '100%'}}>
          <div className={login.btn}>
            <Props content={'SIGN UP'} fsize={'15px'} font={'var(--primary-font)'} bgcolor={'var(--second-color)'} 
                  col={'var(--third-color)'} bord={'none'} rad={'0'} pad={'10px 23px'} 
                  hbg={'var(--first-color)'} cursor={'pointer'} trans={'0.4s'}
            />
          </div>
        </Link>
      </div>
    </div>
    </>
  )
}

export default Login