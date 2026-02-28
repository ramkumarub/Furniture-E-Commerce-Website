import React, { useState } from 'react'
import trackorder from './trackorder.module.css'
import Props from '../../Props/Props'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Trackorder = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState({})
  const [success, setSuccess] = useState('')

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
    else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password)) {
      newError.password = 'Invalid Password'
    }

    setError(newError)
    return Object.keys(newError).length === 0
  
  }

  const handleSubmit = async() => {

    if(validate()) {
      setSuccess('Logged In Successfully 🎉')
      setEmail('')
      setPassword('')
      try {

        const payload = {
          email : email,
          password : password
        }
        await axios.post(`https://jsonplaceholder.typicode.com/users`, payload)
      }
      catch (error) {
        console.log(error)
      }
    }
    else {
      setSuccess('')
    }

  }

  return (
    <>
    <div className={trackorder.container}>
      <h1>ORDERS</h1>
      <div className={trackorder.loginform}>
        <h2>LOGIN</h2>
        <div className={trackorder.main}>
          <input type="text" placeholder='Email address *Required' value={email} onChange={(e) => setEmail(e.target.value)} 
            className={`${trackorder.textbox} ${error.email ? trackorder.errorinput : ''}`} />
          {error.email && (<p style={{ fontSize: '12px', color: 'red' }}>{error.email}</p>)}
        </div>
         <div className={trackorder.main}>
          <input type="text" placeholder='Password *Required' value={password} onChange={(e) => setPassword(e.target.value)} 
            className={`${trackorder.textbox} ${error.password ? trackorder.errorinput : ''}`} />
          {error.password && (<p style={{ fontSize: '12px', color: 'red' }}>{error.password}</p>)}
          {success && (<p style={{ fontSize: '12px', color: 'green' }}>{success}</p>)}
        </div>
        <div className={trackorder.remember}>
          <input type="checkbox" />
          <span>  Remember Me</span>
        </div>
        <div className={trackorder.btn}>
          <Props content={'LOG IN'} fsize={'15px'} font={'var(--primary-font)'} bgcolor={'var(--second-color)'} 
                col={'var(--third-color)'} bord={'none'} rad={'0'} pad={'10px 23px'} 
                hbg={'var(--first-color)'} cursor={'pointer'} trans={'0.4s'} oncl={handleSubmit}
          />
        </div>
        <Link to={'/Reset'}>
          <h6>Lost your password?</h6>
        </Link>
      </div>
    </div>
    </>
  )
}

export default Trackorder