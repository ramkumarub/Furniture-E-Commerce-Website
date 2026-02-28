import React from 'react'
import whychooseus from './whychooseus.module.css'
import { FaShippingFast } from "react-icons/fa";
import { FaRegCreditCard } from "react-icons/fa";
import { FaShieldAlt } from "react-icons/fa";
import { FaCartArrowDown } from "react-icons/fa";

const Whychooseus = () => {

  const chooseusData = [
    {
      _id : 1,
      icon : <FaShippingFast />,
      option : 'FAST DELIVERY',
      description : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec.'
    },
    {
      _id : 2,
      icon : <FaRegCreditCard />,
      option : 'FREE SHIPPING',
      description : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec.'
    },
    {
      _id : 3,
      icon : <FaShieldAlt />,
      option : 'SECURE CHECKOUT',
      description : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec.'
    },
    {
      _id : 4,
      icon : <FaCartArrowDown />,
      option : 'EASY RETURNS',
      description : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec.'
    }
  ]

  return (
    <>
      <div className={whychooseus.container}>
        <div className={whychooseus.title}>
          <h6>BEST PRODUCTS</h6>
          <h2>WHY CHOOSE US</h2>
          <span></span>
        </div>
        <div className={whychooseus.whychooseus}>
          {chooseusData.map((item) => (
            <div className={whychooseus.chooseus} key={item._id}>
              <div className={whychooseus.chooseusdetail}>
                <span>{item.icon}</span>
                <h4>{item.option}</h4>
                <h6>{item.description}</h6>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default Whychooseus