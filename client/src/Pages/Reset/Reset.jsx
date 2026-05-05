import React, { useState } from 'react'
import reset from './reset.module.css'
import Props from '../../Props/Props'
import axios from 'axios'

const Reset = () => {

  const [email, setEmail] = useState('')
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

    setError(newError)
    return Object.keys(newError).length === 0
  
  }

  const handleSubmit = async() => {

    if(validate()) {
      setSuccess('Password Resetted Successfully 🎉')
      setEmail('')
      try {

        const payload = {
          email : email
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
    <div className={reset.container}>
      <h1>LOST PASSWORD</h1>
      <div className={reset.loginform}>
        <h6>Lost your password? Please enter your username or email address. You will receive a link to create a new password via email.</h6>
        <div className={reset.resetbox}>
          <input type="text" placeholder='Email address *Required' value={email} onChange={(e) => setEmail(e.target.value)} 
            className={`${reset.textbox} ${error.email ? reset.errorinput : ''}`} />
          {error.email && (<p style={{ fontSize: '12px', color: 'red' }}>{error.email}</p>)}
          {success && (<p style={{ fontSize: '12px', color: 'green' }}>{success}</p>)}
        </div>
        <div className={reset.btn}>
          <Props content={'RESET PASSWORD'} fsize={'15px'} font={'var(--primary-font)'} bgcolor={'var(--second-color)'} 
                col={'var(--third-color)'} bord={'none'} rad={'0'} pad={'12px 25px'} 
                hbg={'var(--first-color)'} cursor={'pointer'} trans={'0.4s'} oncl={handleSubmit}
          />
        </div>
      </div>
    </div>
    </>
  )
}

export default Reset