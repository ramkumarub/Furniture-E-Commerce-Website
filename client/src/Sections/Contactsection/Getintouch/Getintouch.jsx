import React, { useState } from 'react'
import getintouch from './getintuch.module.css'
import Props from '../../../Props/Props'
import axios from 'axios'
import { IoMdCheckmarkCircleOutline } from "react-icons/io";


const Getintouch = () => {
    
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [subject, setSubject] = useState('')
    const [message, setMessage] = useState('')
    const [submitted, setSubmitted] = useState(false)
    const [error, setError] =useState({})
    
    const validate = () => {

        const newError = {}
        
        if (!name.trim()) {
            newError.name = 'Name is Required'
        }
        else if (!/^[A-Za-z ]+$/.test(name)) {
            newError.name = 'Invalid Name'
        }

        if (!email.trim()) {
            newError.email = 'Email Address is Required'
        }
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            newError.email = 'Invalid Email Address'
        }

        if (!subject.trim()) {
            newError.subject = 'Subject is Required'
        }
        else if (!/^[A-Za-z0-9\s.,!?'"()-]{3,100}$/.test(subject)) {
            newError.subject = 'Invalid Subject'
        }

        if (!message.trim()) {
            newError.message = 'Message is Required'
        }
        else if (!/^(?!\s*$).{10,500}$/.test(message)) {
            newError.message = 'Invalid Message'
        }

        setError(newError)
        return Object.keys(newError).length === 0

    }

    const handleSubmit = async () => {
        if (!validate()) 
            return
        try {
            const payload = {
                name: name,
                email: email,
                subject : subject,
                message: message
            }
            await axios.post(`https://furniture-e-commerce-website.onrender.com/api/contacts`, payload)
            setSubmitted(true)
        }
        catch (error) {
            console.log(error)
        }
    }

  return (
    <>
        <div className={getintouch.container}>
            <h6>MESSAGE US</h6>
            <h1>GET IN TOUCH</h1>
            <span></span>
            {!submitted ? (
                <div className={getintouch.main}>
                    <div className={getintouch.contactform}>
                        <label htmlFor="name">Name <span style={{color : 'red', borderBottom : 'none'}}>*</span></label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder='Enter Your Name *' 
                            className={`${getintouch.textbox} ${error.name ? getintouch.errorinput : ''}`} />
                        {error.name && (<p style={{ fontSize: '12px', color: 'red' }}>{error.name}</p>)}
                    </div>
                    <div className={getintouch.contactform}>
                        <label htmlFor="email">Email <span style={{color : 'red', borderBottom : 'none'}}>*</span></label>
                        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter Your Email Address *'
                        className={`${getintouch.textbox} ${error.email ? getintouch.errorinput : ''}`} />
                        {error.email && (<p style={{ fontSize: '12px', color: 'red' }}>{error.email}</p>)}
                    </div>
                    <div className={getintouch.contactform}>
                        <label htmlFor="subject">Subject <span style={{color : 'red', borderBottom : 'none'}}>*</span></label>
                        <input type="text" value={subject} onChange={(e) => setSubject(e.target.value)} placeholder='Enter Your Subject *'
                        className={`${getintouch.textbox} ${error.subject ? getintouch.errorinput : ''}`} />
                        {error.subject && (<p style={{ fontSize: '12px', color: 'red' }}>{error.subject}</p>)}
                    </div>
                    <div className={getintouch.contactform}>
                        <label htmlFor="name">Message <span style={{color : 'red', borderBottom : 'none'}}>*</span></label>
                        <textarea name="message" rows={5} value={message} onChange={(e) => setMessage(e.target.value)} placeholder='Enter Your Message *' 
                            className={`${getintouch.textbox} ${error.message ? getintouch.errorinput : ''}`} />
                        {error.message && (<p style={{ fontSize: '12px', color: 'red' }}>{error.message}</p>)}
                    </div>
                    <div className={getintouch.btn}>
                        <Props content={'SEND'} fsize={'15px'} font={'var(--primary-font)'} bgcolor={'var(--second-color)'}
                            col={'var(--third-color)'} bord={'none'} rad={'5px'} pad={'10px 15px'}
                            hbg={'var(--first-color)'} cursor={'pointer'} trans={'0.4s'} oncl={handleSubmit}
                        />
                    </div>
                </div>
            ) : (
                <div className={getintouch.submitted}>
                    <h6><IoMdCheckmarkCircleOutline /></h6>
                    <h1>THANK YOU</h1>
                    <p>Your form has been submitted successfully. We'll review your details and get back to you soon.</p>
                </div>
            )}
        </div>
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2362.5712166784456!2d0.0689860764673331!3d51.46633772180399!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47d8a91f2b7f45a3%3A0xfa8a76749c12577e!2sOxleas%20Wood!5e1!3m2!1sen!2sin!4v1771570116378!5m2!1sen!2sin" width="100%" height="450" style={{border : '0'}} loading="lazy" title='location' />
    </>
  )
}

export default Getintouch