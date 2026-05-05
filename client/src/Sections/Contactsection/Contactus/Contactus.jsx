import React from 'react'
import contactus from './contactus.module.css'
import { FaPhone } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { IoLocationSharp } from "react-icons/io5";

const Contactus = () => {

  const contactData = [

    { _id: 1, icon: <FaPhone />, info: 'PHONE NUMBER', infodetail: '929-242-6868' },
    { _id: 2, icon: <MdOutlineEmail />, info: 'EMAIL', infodetail: 'contact@info.com' },
    { _id: 3, icon: <IoLocationSharp />, info: 'ADDRESS', infodetail: '123 Fifth Avenue, New York, NY 10160' }

  ]

  return (
    <>
      <div className={contactus.container}>
        <h6>DON'T BE A STRANGER</h6>
        <h1>CONTACT US</h1>
        <span></span>
        <div className={contactus.main}>
          {contactData.map((contact) => (
            <div className={contactus.details} key={contact._id}>
              <h2>{contact.icon}</h2>
              <h3>{contact.info}</h3>
              <h5>{contact.infodetail}</h5>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default Contactus