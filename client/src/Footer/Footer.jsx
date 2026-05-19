import React, { useState } from 'react'
import footer from './footer.module.css'
import companylogo from '../Assets/company-logo.png'
import Props from '../Props/Props'
import Copyright from '../Copyrights/Copyright'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Footer = () => {

    const [email, setEmail] = useState('')
    const [error, setError] = useState({})
    const [success, setSuccess] = useState('')
    const [apiError, setApiError] = useState('')

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

        if (validate()) {
            setError({})
            setSuccess('')
            setApiError('')
            try {
                const payload = {
                    email: email
                }
                const response = await axios.post(`http://localhost:8000/api/subscribe`, payload)
                setSuccess(response.data.message)
                
                setEmail('')
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
            <div className={footer.container}>
                <div className={footer.companyname}>
                    <Link to={'/'}>
                        <img src={companylogo} alt='company-logo' />
                    </Link>
                </div>
                <div className={footer.links}>
                    <h4>LINKS</h4>
                    <div className={footer.linksitems}>
                        <h6>
                            <Link to={'/story'}>
                                <span>Story</span>
                            </Link>
                        </h6>
                        <h6>
                            <Link to={'/contact'}>
                                <span>Contact</span>
                            </Link>
                        </h6>
                        <h6>
                            <Link to={'/help'}>
                                <span>Help</span>
                            </Link>
                        </h6>
                        <h6>
                            <Link to={'/login'}>
                                <span>Login / </span> 
                            </Link>
                            <Link to={'/signup'}>
                                <span>Signup</span>
                            </Link>
                        </h6>
                        <h6>
                            <Link to={'/logout'}>
                                <span>Logout</span>
                            </Link>
                        </h6>
                    </div>
                </div>
                <div className={footer.categories}>
                    <h4>CATEGORIES</h4>
                    <div className={footer.categoriesitems}>
                        <h6>
                            <Link to={'/shopall'}>
                                <span>Shopall</span>
                            </Link>
                        </h6>
                        <h6>
                            <Link to={'/bedroom'}>
                                <span>Bedroom</span>
                            </Link>
                        </h6>
                        <h6>
                            <Link to={'/decor'}>
                                <span>Decor</span>
                            </Link>
                        </h6>
                        <h6>
                            <Link to={'/livingroom'}>
                                <span>Living Room</span>
                            </Link>
                        </h6>
                        <h6>
                            <Link to={'/office'}>
                                <span>Office</span>
                            </Link>
                        </h6>
                    </div>
                </div>
                <div className={footer.subscribe}>
                    <h4>SUBSCRIBE</h4>
                    <div className={footer.subscribeitems}>
                        <div className={footer.subscribebox}>
                            <input type="text" placeholder='Enter your email address *' value={email} onChange={(e) => setEmail(e.target.value)} 
                                name='email' autoComplete='email' className={error.email ? footer.errorinput : ''} />
                            {error.email && (<p style={{ fontSize: '12px', color: 'red' }}>{error.email}</p>)}
                            {apiError && (<p style={{ fontSize: '12px', color: 'red' }}>{apiError}</p>)}
                            {success && (<p style={{ fontSize: '12px', color: 'green' }}>{success}</p>)}
                        </div>
                        <Props content={'SUBSCRIBE'} fsize={'15px'} font={'var(--primary-font)'} bgcolor={'var(--second-color)'}
                            col={'var(--third-color)'} bord={'none'} rad={'5px'} pad={'10px 15px'}
                            hbg={'var(--first-color)'} cursor={'pointer'} trans={'0.4s'} oncl={handleSubmit}
                        />
                    </div>
                </div>
            </div>
            <Copyright />
        </>
    )
}

export default Footer