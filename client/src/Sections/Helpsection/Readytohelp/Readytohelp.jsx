import React from 'react'
import readytohelp from './readytohelp.module.css'
import { FaUser } from "react-icons/fa";
import { FaHeadphones } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";
import { FaLongArrowAltRight } from "react-icons/fa";
import { Link } from 'react-router-dom';


const Readytohelp = () => {

    const readytohelpData = [
        {
            _id: 1,
            icon: <FaUser />,
            option: 'ACCOUNT PRICVACY',
            description: 'Quisque a pharetra quam. Donec et risus sem. Etiam sollicitudin leo eu congue gravida. In semper lectus neque, eu interdum nisl pretium sit amet etiam efficitur.',
            link : 'PRIVACY POLICTY',
            path : '/story'
        },
        {
            _id: 2,
            icon: <FaHeadphones />,
            option: 'SUPPORT SPECIALIST',
            description: 'Quisque a pharetra quam. Donec et risus sem. Etiam sollicitudin leo eu congue gravida. In semper lectus neque, eu interdum nisl pretium sit amet etiam efficitur.',
            link : 'CONTACT US',
            path : '/contact'
        },
        {
            _id: 3,
            icon: <FaStar />,
            option: 'SELLER STANDARDS',
            description: 'Quisque a pharetra quam. Donec et risus sem. Etiam sollicitudin leo eu congue gravida. In semper lectus neque, eu interdum nisl pretium sit amet etiam efficitur.',
            link : 'LEARN MORE',
            path : '/story'
        }
    ]

    return (
        <>
            <div className={readytohelp.container}>
                <h6>24/7 SUPPORT</h6>
                <h1>READY TO HELP</h1>
                <span></span>
                <div className={readytohelp.readytohelp}>
                    {readytohelpData.map((item) => (
                        <div className={readytohelp.ready} key={item._id}>
                            <div className={readytohelp.readydetail}>
                                <span>{item.icon}</span>
                                <h4>{item.option}</h4>
                                <h6>{item.description}</h6>
                                <Link to={item.path}>
                                    <h5>{item.link} <FaLongArrowAltRight /></h5>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default Readytohelp