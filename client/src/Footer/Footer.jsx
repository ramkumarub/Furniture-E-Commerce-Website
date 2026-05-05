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
            setSuccess('Subscribed Successfully! 🎉')
            setEmail('')
            try {
                const payload = {
                    email: email
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
                            <Link to={'/Story'}>
                                Story
                            </Link>
                        </h6>
                        <h6>
                            <Link to={'/Contact'}>
                                Contact
                            </Link>
                        </h6>
                        <h6>
                            <Link to={'/Trackorder'}>
                                Track Order
                            </Link>
                        </h6>
                        <h6>
                            <Link to={'/Help'}>
                                Help
                            </Link>
                        </h6>
                    </div>
                </div>
                <div className={footer.categories}>
                    <h4>CATEGORIES</h4>
                    <div className={footer.categoriesitems}>
                        <h6>
                            <Link to={'/Bedroom'}>
                                Bedroom <span style={{ color: 'black', fontWeight: '300' }}>(6)</span>
                            </Link>
                        </h6>
                        <h6>
                            <Link to={'/Decor'}>
                                Decor <span style={{ color: 'black', fontWeight: '300' }}>(6)</span>
                            </Link>
                        </h6>
                        <h6>
                            <Link to={'/Livingroom'}>
                                Living Room <span style={{ color: 'black', fontWeight: '300' }}>(6)</span>
                            </Link>
                        </h6>
                        <h6>
                            <Link to={'/Office'}>
                                Office <span style={{ color: 'black', fontWeight: '300' }}>(6)</span>
                            </Link>
                        </h6>
                    </div>
                </div>
                <div className={footer.subscribe}>
                    <h4>SUBSCRIBE</h4>
                    <div className={footer.subscribeitems}>
                        <div className={footer.subscribebox}>
                            <input type="text" placeholder='Enter your email address *' value={email} onChange={(e) => setEmail(e.target.value)} 
                                className={error.email ? footer.errorinput : ''} />
                            {error.email && (<p style={{ fontSize: '12px', color: 'red' }}>{error.email}</p>)}
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