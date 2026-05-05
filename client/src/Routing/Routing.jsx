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
import Trackorder from '../Pages/Trackorder/Trackorder'
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
            <Route path='/Shopall' element={<Shopall />} />
            <Route path='/Decor' element={<Decor />} />
            <Route path='/Office' element={<Office />} />
            <Route path='/Livingroom' element={<Livingroom />} />
            <Route path='/Bedroom' element={<Bedroom />} />
            <Route path='/Story' element={<Story />} />
            <Route path='/Contact' element={<Contact />} />
            <Route path='/Trackorder' element={<Trackorder />} />
            <Route path='/Help' element={<Help />} />
            <Route path='/Reset' element={<Reset />} />
            <Route path='/product/:_id/:category' element={<ProductDetail />} />
            <Route path='/Viewcart' element={<Viewcart />}></Route>
            <Route path='/Checkout' element={<Checkout />}></Route>
        </Routes>
      <Footer />
    </>
  )
}

export default Routing