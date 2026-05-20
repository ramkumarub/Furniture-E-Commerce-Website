import React, { useState } from 'react'
import checkout from './checkout.module.css'
import axios from 'axios'
import { Country, State } from 'country-state-city'
import { FaRegCheckCircle } from "react-icons/fa";
import { Link } from 'react-router-dom';
import Props from '../Props/Props';
import { useCart } from '../Context/Cartcontext';
import { IoIosLock } from "react-icons/io";
import { useNavigate, useLocation } from 'react-router-dom';

const Checkout = () => {

  const { cartSubtotal, cartItems, setCartItems } = useCart();

  const countries = Country.getAllCountries()

  const [email, setEmail] = useState('')
  const [fname, setFname] = useState('')
  const [lname, setLname] = useState('')
  const [houseNumber, setHouseNumber] = useState('')
  const [streetName, setStreetName] = useState('')
  const [town, setTown] = useState('')
  const [pincode, setPincode] = useState('')
  const [number, setNumber] = useState('')
  const [selectedCountry, setSelectedCountry] = useState('')
  const [states, setStates] = useState([])
  const [selectedState, setSelectedState] = useState('')
  const [error, setError] = useState({})
  const [payment, setPayment] = useState('')
  const [additionalInformation, setAdditionalInformation] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const navigate = useNavigate()
  const location = useLocation()
  const token = localStorage.getItem("token") || sessionStorage.getItem("token")

  const handleCountryChange = (e) => {
    const countryCode = e.target.value
    setSelectedCountry(countryCode)

    const stateList = State.getStatesOfCountry(countryCode)
    setStates(stateList)
    setSelectedState('')
  }

  const validate = () => {

    const newError = {}

    if (!email.trim()) {
      newError.email = 'Email Address is Required'
    }
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newError.email = 'Invalid Email Address'
    }

    if (!fname.trim()) {
      newError.fname = 'First Name is Required'
    }
    else if (!/^[A-Za-z ]+$/.test(fname)) {
      newError.fname = 'Invalid First Name'
    }

    if (!lname.trim()) {
      newError.lname = 'Last Name is Required'
    }
    else if (!/^[A-Za-z ]+$/.test(lname)) {
      newError.lname = 'Invalid Last Name'
    }

    if (!houseNumber.trim()) {
      newError.houseNumber = 'House Number is Required'
    }
    else if (!/^[0-9A-Za-z\s/-]{1,20}$/.test(houseNumber)) {
      newError.houseNumber = 'Invalid House Number'
    }

    if (!streetName.trim()) {
      newError.streetName = 'Street Name is Required'
    }
    else if (!/^[A-Za-z0-9][A-Za-z0-9\s.'-]{2,99}$/.test(streetName)) {
      newError.streetName = 'Invalid Street Name'
    }

    if (!town.trim()) {
      newError.town = 'Town / City Name is Required'
    }
    else if (!/^[A-Za-z][A-Za-z\s.'-]{1,49}$/.test(town)) {
      newError.town = 'Invalid Town / City Name'
    }

    if (!pincode.trim()) {
      newError.pincode = 'Pin Code is Required'
    }
    else if (!/^[1-9][0-9]{5}$/.test(pincode)) {
      newError.pincode = 'Invalid Pin Code'
    }

    if (!number.trim()) {
      newError.number = 'Phone Number is Required'
    }
    else if (!/^[6-9]\d{9}$/.test(number)) {
      newError.number = 'Invalid Phone Number'
    }

    if (!selectedCountry) {
      newError.selectedCountry = 'Country is Required'
    }

    if (!selectedState) {
      newError.selectedState = 'State is Required'
    }

    if (!payment) {
      newError.payment = 'Select a Payment Method'
    }

    setError(newError)
    return Object.keys(newError).length === 0
  }

  const handleSubmit = async () => {
    if (!token) {
      alert("Please login to place order")
      navigate("/login", {
        state : {
          from : location.pathname
        }
      })
      return
    }
    if (!validate())
      return
    try {
      const payload = {
        productId: cartItems.map((item) => item.productId),
        productName: cartItems.map((item) => item.name),
        productPrice: cartItems.map((item) => item.price),
        productColor: cartItems.map((item) => item.color),
        productQuantity: cartItems.map((item) => item.quantity),
        totalPrice: cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2),
        email: email,
        fname: fname,
        lname: lname,
        selectedCountry : selectedCountry, 
        houseNumber : houseNumber,
        streetName: streetName,
        town : town,
        selectedState : selectedState,
        pincode : pincode,
        number : number,
        additionalInformation : additionalInformation,
        payment : payment
      }
      const response = await axios.post(
        `https://furniture-e-commerce-website.onrender.com/api/checkouts`,
        payload,
        {
          headers : {
            Authorization : `Bearer ${token}`
          }
        }
      )
      for (let item of cartItems) {
        await axios.put(`
          https://furniture-e-commerce-website.onrender.com/api/products/${item.productId}/variants/${item.variantId}/stock`, 
          {
            stock : item.quantity
          }
        )
      }
      alert(response.data.message)
      setCartItems([])
      localStorage.removeItem('cart')
      setSubmitted(true)
    }
    catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div className={checkout.container}>
        {!submitted ? (
          <div className={checkout.main}>
            <div className={checkout.contact}>
              <h1>Contact</h1>
              <div className={checkout.checkoutform}>
                <input type="text" placeholder='Enter your email address *' value={email} onChange={(e) => setEmail(e.target.value)}
                  className={`${checkout.textbox} ${error.email ? checkout.errorinput : ''}`} />
                {error.email && (<p style={{ fontSize: '12px', color: 'red' }}>{error.email}</p>)}
                {/* <button onClick={handleSubmit}>gg</button> */}
              </div>
            </div>
            <div className={checkout.address}>
              <h1>Billing Details</h1>

                <div className={checkout.namelist}>
                  <input type="text" placeholder='Enter your first name *' value={fname} onChange={(e) => setFname(e.target.value)}
                    className={`${checkout.textbox} ${error.fname ? checkout.errorinput : ''}`} />
                  {error.fname && (<p style={{ fontSize: '12px', color: 'red' }}>{error.fname}</p>)}
                </div>

                <div className={checkout.namelist}>
                  <input type="text" placeholder='Enter your last name *' value={lname} onChange={(e) => setLname(e.target.value)}
                    className={`${checkout.textbox} ${error.lname ? checkout.errorinput : ''}`} />
                  {error.lname && (<p style={{ fontSize: '12px', color: 'red' }}>{error.lname}</p>)}
                </div>

              <div className={checkout.namelist}>
                <select className={`${checkout.textbox} ${error.selectedCountry ? checkout.errorinput : ''}`} 
                  value={selectedCountry} onChange={handleCountryChange}>
                  <option value="">Select Country</option>
                  {countries.map((country) => (
                    <option key={country.isoCode} value={country.isoCode}>
                      {country.name}
                    </option>
                  ))}
                </select>
                {error.selectedCountry && (<p style={{ fontSize: '12px', color: 'red' }}>{error.selectedCountry}</p>)}
              </div>

              <div className={checkout.namelist}>
                <input type="text" placeholder='House number *' value={houseNumber} onChange={(e) => setHouseNumber(e.target.value)}
                  className={`${checkout.textbox} ${error.houseNumber ? checkout.errorinput : ''}`} />
                {error.houseNumber && (<p style={{ fontSize: '12px', color: 'red' }}>{error.houseNumber}</p>)}
              </div>

              <div className={checkout.namelist}>
                <input type="text" placeholder='Street name *' value={streetName} onChange={(e) => setStreetName(e.target.value)}
                  className={`${checkout.textbox} ${error.streetName ? checkout.errorinput : ''}`} />
                {error.streetName && (<p style={{ fontSize: '12px', color: 'red' }}>{error.streetName}</p>)}
              </div>

                <div className={checkout.namelist}>
                  <input type="text" placeholder='Town / City *' value={town} onChange={(e) =>setTown(e.target.value)}
                    className={`${checkout.textbox} ${error.town ? checkout.errorinput : ''}`} />
                  {error.town && (<p style={{ fontSize: '12px', color: 'red' }}>{error.town}</p>)}
                </div>

                <div className={checkout.namelist}>
                  <select className={`${checkout.textbox} ${error.selectedState ? checkout.errorinput : ''}`}
                    value={selectedState} onChange={(e) => setSelectedState(e.target.value)}>
                    <option value="">Select State</option>
                    {states.map((state) => (
                      <option key={state.isoCode} value={state.isoCode}>
                        {state.name}
                      </option>
                    ))}
                  </select>
                  {error.selectedState && (<p style={{ fontSize: '12px', color: 'red' }}>{error.selectedState}</p>)}
                </div>

                <div className={checkout.namelist}>
                  <input type="text" placeholder='Pincode *' value={pincode} onChange={(e) => setPincode(e.target.value)}
                    className={`${checkout.textbox} ${error.pincode ? checkout.errorinput : ''}`} />
                  {error.pincode && (<p style={{ fontSize: '12px', color: 'red' }}>{error.selectpincodeedState}</p>)}
                </div>

                <div className={checkout.namelist}>
                  <input type="text" placeholder='Enter your phone Number *' value={number} onChange={(e) => setNumber(e.target.value)}
                    className={`${checkout.textbox} ${error.number ? checkout.errorinput : ''}`} />
                  {error.number && (<p style={{ fontSize: '12px', color: 'red' }}>{error.number}</p>)}
                </div>

            </div>

            <div className={checkout.additional}>
              <h1>Additional Information</h1>
              <div className={checkout.checkoutform}>
                <textarea placeholder='Notes about your order, e.g. special notes for delivery.' className={checkout.textbox} 
                rows={3} value={additionalInformation} onChange={(e) => setAdditionalInformation(e.target.value)} />
              </div>
            </div>

            <div className={checkout.payment}>
              <h1>Payment</h1>
              <div className={checkout.remembermain}>
                <div className={checkout.remember}>
                  <input type="radio" name="payment" value="Direct Bank Transfer" checked={payment === "Direct Bank Transfer"} 
                    onChange={(e) => setPayment(e.target.value)} /> 
                    <span>Direct Bank Transfer</span>
                </div>
                <div className={checkout.remember}>
                  <input type="radio" name="payment" value="Online Transaction" checked={payment === "Online Transaction"} 
                    onChange={(e) => setPayment(e.target.value)} /> 
                    <span>Online Transaction</span>
                </div>
                <div className={checkout.remember}>
                  <input type="radio" name="payment" value="Cash On Delivery" checked={payment === "Cash On Delivery"}
                    onChange={(e) => setPayment(e.target.value)} /> 
                    <span>Cash On Delivery</span>
                </div>
              </div>
              {error.payment && (<p style={{ fontSize: "12px", color: "red" }}>{error.payment}</p>)}
            </div>

            <div className={checkout.placeorderbtn}>
              <Props content={<><IoIosLock style={{ marginRight: '5px', fontSize : '20px' }} />Place Order $ {cartSubtotal.toFixed(2)}</>} 
                    fsize={'20px'} font={'var(--primary-font)'} bgcolor={'var(--second-color)'} 
                    col={'var(--third-color)'} bord={'none'} rad={'0'} pad={'15px'} 
                    hbg={'var(--first-color)'} cursor={'pointer'} trans={'0.4s'} oncl={handleSubmit}
              />
            </div>

          </div>
        ) : (
          <div className={checkout.submain}>

            <div className={checkout.personname}>
              <h1>
                <span><FaRegCheckCircle /></span>
                Thank you {fname} {lname}!
              </h1>
            </div>

            <div className={checkout.updates}>
              <h1>Order Updates</h1>
              <p>You will receive order and shipping updates via email.</p>
            </div>

            <div className={checkout.details}>

              <div className={checkout.contact}>
                <div style={{width :'50%'}}>
                  <h4>Contact</h4>
                </div>
                <div style={{width :'50%'}}>
                  <p style={{textAlign : 'left'}}>{email}</p>
                </div>
              </div>

              <div className={checkout.address}>
                <div style={{width :'50%'}}>
                  <h4>Address</h4>
                </div>
                <div style={{width :'50%', display : 'flex', flexDirection : 'column', gap : '3px'}}>
                  <p style={{textAlign : 'left'}}>{fname} {lname}</p>
                  <p style={{textAlign : 'left'}}>{houseNumber}, {streetName}</p>
                  <p style={{textAlign : 'left'}}>{town}, {pincode}</p>
                  <p style={{textAlign : 'left'}}>{selectedState}, {selectedCountry}</p>
                  <p style={{textAlign : 'left'}}>{number}</p>
                  <p style={{textAlign : 'left'}}>{email}</p>
                </div>
              </div>

              <div className={checkout.payment}>
                <div style={{width :'50%'}}>
                  <h4>Payment</h4>
                </div>
                <div style={{width :'50%'}}>
                  <p style={{textAlign : 'left'}}>{payment}</p>
                </div>
              </div>

            </div>
            
            <div>
              <Link to={'/shopall'}>
                <Props content={'Continue Shopping'} fsize={'15px'} font={'var(--primary-font)'} bgcolor={'var(--second-color)'} 
                      col={'var(--third-color)'} bord={'none'} rad={'0'} pad={'10px 23px'} 
                      hbg={'var(--first-color)'} cursor={'pointer'} trans={'0.4s'}
                />
              </Link>
            </div>

          </div>
        )}
      </div>
    </>
  )
}

export default Checkout