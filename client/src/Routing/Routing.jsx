import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from '../Pages/Home/Home'
import Shopall from '../Pages/Shopall/Shopall'
import Decor from '../Pages/Decor/Decor'
import Office from '../Pages/Office/Office'
import Livingroom from '../Pages/Livingroom/Livingroom'
import Bedroom from '../Pages/Bedroom/Bedroom'
import Story from '../Pages/Story/Story'
import Contact from '../Pages/Contact/Contact'
import Login from '../Pages/Login/Login'
import Logout from '../Pages/Logout/Logout'
import Signup from "../Pages/Signup/Signup"
import Help from '../Pages/Help/Help'
import Reset from '../Pages/Reset/Reset'
import Navbar from '../Header/Navbar'
import Footer from '../Footer/Footer'
import ProductDetail from '../Pages/Productdetail/Productdetail'
import Viewcart from '../Viewcart/Viewcart'
import Checkout from '../Checkout/Checkout'

const Routing = () => {
  return (
    <>
      <Navbar />
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/shopall' element={<Shopall />} />
            <Route path='/decor' element={<Decor />} />
            <Route path='/office' element={<Office />} />
            <Route path='/livingroom' element={<Livingroom />} />
            <Route path='/bedroom' element={<Bedroom />} />
            <Route path='/story' element={<Story />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/login' element={<Login />} />
            <Route path='/logout' element={<Logout />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/help' element={<Help />} />
            <Route path='/reset' element={<Reset />} />
            <Route path='/product/:_id/:category' element={<ProductDetail />} />
            <Route path='/viewcart' element={<Viewcart />}></Route>
            <Route path='/checkout' element={<Checkout />}></Route>
        </Routes>
      <Footer />
    </>
  )
}

export default Routing