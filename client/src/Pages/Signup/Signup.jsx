import React, { useState } from 'react'
import signup from './signup.module.css'
import Props from '../../Props/Props'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Signup = () => {
    
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState({})
    const [success, setSuccess] = useState('')
    const [apiError, setApiError] = useState('')
    const [terms, setTerms] = useState(false)

    const navigate = useNavigate()

    const validate = () => {

        const newError = {}

        if (!name.trim()) {
            newError.name = 'Name is Required'
        }
        else if (!/^[A-Za-z\s]{3,30}$/.test(name)) {
            newError.name = 'Invalid Name'
        }

        if (!email.trim()) {
            newError.email = 'Email Address is Required'
        }
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            newError.email = 'Invalid Email Address'
        }

        if (!password.trim()) {
            newError.password = 'Password is Required'
        }
        else if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{6,}$/.test(password)) {
            newError.password = 'Invalid Password'
        }

        if (!confirmPassword.trim()) {
            newError.confirmPassword = 'Password is Required'
        }
        else if (password !== confirmPassword) {
            newError.confirmPassword = 'Invalid Password'
        }

        if (!terms) {
            newError.terms = 'Please accept the Terms & Conditions'
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
                name : name,
                email : email,
                password : password
                }
                const response = await axios.post(`http://localhost:8000/api/users/signup`, payload)
                alert(response.data.message)
                localStorage.setItem("token", response.data.token)
                localStorage.setItem("email", response.data.user.email)
                setSuccess(response.data.message)
                setError({})
                setName('')
                setEmail('')
                setPassword('')
                setConfirmPassword('')
                setTerms(false)
                setTimeout(() => {
                    navigate("/")
                }, 1000);
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
    <div className={signup.container}>
        <h1>SIGNUP</h1>
        <div className={signup.signupform}>
            <h2>SIGNUP</h2>
            <div className={signup.main}>
                <input type="text" placeholder='Name *Required' value={name} onChange={(e) => setName(e.target.value)} 
                    className={`${signup.textbox} ${error.name ? signup.errorinput : ''}`} />
                {error.name && (<p style={{ fontSize: '12px', color: 'red' }}>{error.name}</p>)}
            </div>
            <div className={signup.main}>
                <input type="text" placeholder='Email Address *Required' value={email} onChange={(e) => setEmail(e.target.value)} 
                    className={`${signup.textbox} ${error.email ? signup.errorinput : ''}`} />
                {error.email && (<p style={{ fontSize: '12px', color: 'red' }}>{error.email}</p>)}
            </div>
            <div className={signup.main}>
                <input type="text" placeholder='Password *Required' value={password} onChange={(e) => setPassword(e.target.value)} 
                    className={`${signup.textbox} ${error.password ? signup.errorinput : ''}`} />
                {error.password && (<p style={{ fontSize: '12px', color: 'red' }}>{error.password}</p>)}
            </div>
             <div className={signup.main}>
                <input type="text" placeholder='Confirm Password *Required' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} 
                    className={`${signup.textbox} ${error.confirmPassword ? signup.errorinput : ''}`} />
                {error.confirmPassword && (<p style={{ fontSize: '12px', color: 'red' }}>{error.confirmPassword}</p>)}
                {apiError && (<p style={{ fontSize: '12px', color: 'red' }}>{apiError}</p>)}
                {success && (<p style={{ fontSize: '12px', color: 'green' }}>{success}</p>)}
            </div>
            <div className={signup.remember}>
                <input type="checkbox" checked={terms} onChange={(e) => setTerms(e.target.checked)}/>
                <span>  I agree to Terms & Conditions</span>
            </div>
            {error.terms && (<p style={{ fontSize: '12px', color: 'red', width: '100%', textAlign: 'left' }}>{error.terms}</p>)}
            <div className={signup.btn}>
                <Props content={'SIGN UP'} fsize={'15px'} font={'var(--primary-font)'} bgcolor={'var(--second-color)'} 
                        col={'var(--third-color)'} bord={'none'} rad={'0'} pad={'10px 23px'} 
                        hbg={'var(--first-color)'} cursor={'pointer'} trans={'0.4s'} oncl={handleSubmit}
                />
            </div>
            <Link to={'/login'} style={{display: 'block', width: '100%'}}>
            <div className={signup.btn}>
                <Props content={'LOG IN'} fsize={'15px'} font={'var(--primary-font)'} bgcolor={'var(--second-color)'} 
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

export default Signup