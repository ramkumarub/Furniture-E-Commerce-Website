import React from 'react'
import copyrights from './copyrights.module.css'
import { FaFacebook } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";
import { BsFillThreadsFill } from "react-icons/bs";
import { FaSquareXTwitter } from "react-icons/fa6";

const Copyright = () => {

  const socialIcons = [
    { _id : 1, icon : <FaFacebook /> },
    { _id : 2, icon : <FaYoutube /> },
    { _id : 3, icon : <FaSquareInstagram /> },
    { _id : 4, icon : <BsFillThreadsFill /> },
    { _id : 5, icon : <FaSquareXTwitter /> }
  ]

  return (
    <>
    <hr />
    <div className={copyrights.container}>
        <h6>Copyright © 2026 Furniture Shop | Powered by Furniture Shop</h6>
        <div className={copyrights.socialicons}>
          {socialIcons.map((item) => (
            <div className={copyrights.icons} key={item._id}>
              <span>{item.icon}</span>
            </div>
          ))}
        </div>
    </div>
    </>
  )
}

export default Copyright