import React, { useState } from 'react'
import companylogo from '../Assets/company-logo.png'
import navbar from './navbar.module.css'
import { Link, useLocation } from 'react-router-dom'
// import { FaSearch } from "react-icons/fa";
import { FaCartPlus } from "react-icons/fa";
import { useCart } from '../Cartcontext/Cartcontext';
import { IoClose } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";
import CartDrawer from '../Cartdrawer/Cartdrawer';

const Navbar = () => {
    
    const [isOpen, setIsOpen] = useState(false);
    // const [searchBox, setSearchBox] = useState(false)
    // const [searchTerm, setSearchTerm] = useState('')
    const {cartCount} = useCart();

    const location = useLocation()
    const isHome = location.pathname === "/"

  return (
    <>
        <div className={`${navbar.container} ${isHome ? navbar.transparent : navbar.white}`}>
            <input type="checkbox" id='toggle' className={navbar.toggle} />
            <div className={navbar.companyname}>
                <Link to={'/'}>
                    <img src={companylogo} alt='company-logo' />
                </Link>
                <label htmlFor='toggle'>
                    <span className={navbar.toggleicon}><GiHamburgerMenu /></span>
                    <span className={navbar.closeicon}><IoClose /></span>
                </label>
            </div>
            <div className={navbar.pages}>
                <ul>
                    <li>
                        <Link to={'/Shopall'}>
                            <span>SHOP ALL</span>
                        </Link>
                    </li>
                    <li>
                        <Link to={'/Decor'}>
                            <span>DECOR</span>
                        </Link>
                    </li>
                    <li>
                        <Link to={'/Office'}>
                            <span>OFFICE</span>
                        </Link>
                    </li>
                    <li>
                        <Link to={'/Livingroom'}>
                            <span>LIVING ROOM</span>
                        </Link>
                    </li>
                    <li>
                        <Link to={'/Bedroom'}>
                            <span>BEDROOM</span>
                        </Link>
                    </li>
                </ul>
            </div>
            <div className={navbar.links}>
                <ul>
                    <li>
                        <Link to={'/Story'}>
                            <span>STORY</span>
                        </Link>
                    </li>
                    <li>
                        <Link to={'/Contact'}>
                            <span>CONTACT</span>
                        </Link>
                    </li>
                    <li>
                        <Link to={'/Trackorder'}>
                            <span>TRACK ORDER</span>
                        </Link>
                    </li>
                    <li>
                        <Link to={'/Help'}>
                            <span>HELP</span>
                        </Link>
                    </li>
                    <li>Log In</li>
                    {/* <span className={navbar.searchicon} onClick={() => setSearchBox(true)}><FaSearch /></span> */}
                    <span data-count={cartCount} onClick={() => setIsOpen(true)}
                        className={`${isHome ? navbar.cartcount : navbar.cartcountwhite}`}>
                        <FaCartPlus />
                    </span>
                    <CartDrawer isOpen={isOpen} setIsOpen={setIsOpen} />
                </ul>
            </div>
        </div>
    <hr className={`${isHome ? navbar.transparentline : navbar.whiteline}`} />
    </>
  )
}

export default Navbar