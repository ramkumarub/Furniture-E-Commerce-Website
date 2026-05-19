import React, { useState } from 'react'
import logout from './logout.module.css'
import Props from '../../Props/Props'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Logout = () => {
  
    const navigate = useNavigate()
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    const handleLogout = async() => {
        setError('')
        setSuccess('')
        const token = localStorage.getItem("token") || sessionStorage.getItem("token")
        const email = localStorage.getItem("email") || sessionStorage.getItem("email")
        if (!token || !email) {
            setSuccess('')
            setError("You're Not Logged In")
            return
        }
        if (!token) {
            setError("You're Not Logged In")
            return
        }
        try {
            const email = localStorage.getItem("email") || sessionStorage.getItem("email")
            const response = await axios.post(`https://furniture-e-commerce-website.onrender.com/api/users/logout`, {email})
            alert(response.data.message)
            setSuccess(response.data.message)
            localStorage.removeItem("token")
            localStorage.removeItem("email")
            sessionStorage.removeItem("token")
            sessionStorage.removeItem("email")
            setTimeout(() => {
                navigate("/")
            }, 1000);
        }
        catch (error) {
            console.log(error)
            setSuccess('')
            setError("Logout Failed")
        }
    }

    return (
    <>
        <div className={logout.container}>
            <h1>LOGOUT</h1>
            <div className={logout.logoutform}>
                <h2>LOGOUT</h2>
                <p>You are currently logged in.</p>
                <p>Click below to logout from your account.</p>
                {error && (<p style={{ fontSize: '12px', color: 'red' }}>{error}</p>)}
                {success && (<p style={{ fontSize: '12px', color: 'green' }}>{success}</p>)}
                <div className={logout.btn}>
                    <Props  content={'LOG OUT'} fsize={'15px'} font={'var(--primary-font)'} bgcolor={'var(--second-color)'} col={'var(--third-color)'} 
                      bord={'none'} rad={'0'} pad={'10px 23px'} hbg={'var(--first-color)'} cursor={'pointer'} trans={'0.4s'} oncl={handleLogout}
                    />
                </div>
            </div>
        </div>
    </>
  )
}

export default Logout