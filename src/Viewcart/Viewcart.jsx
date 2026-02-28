import React, { useState } from 'react'
import viewcart from './viewcart.module.css'
import { useCart } from '../Cartcontext/Cartcontext'
import Props from '../Props/Props'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Viewcart = () => {

    const { cartItems, removeFromCart, increaseQty, decreaseQty, cartSubtotal } = useCart();
    
    const [couponCode, setCouponcode] = useState('')
    const [error, setError] = useState({})
    const [success, setSuccess] = useState('')
    const [coupon, setCoupon] = useState(false)

    const couponSubmit = () => {
        setCoupon(true)
    }

    const validate = () => {

        const newError = {}
        
        if (!couponCode.trim()) {
            newError.couponCode = 'Coupon Code is Required'
        }
        else if (!/^[A-Za-z ]+$/.test(couponCode)) {
            newError.couponCode = 'Invalid Coupon Code'
        }

        setError(newError)
        return Object.keys(newError).length === 0

    }

    const handleSubmit = async() => {
        if (validate()) {
            setSuccess('Counpon Code Applied Successfully! 🎉')
            setCouponcode('')
            try {
                const payload = {
                    couponCode: couponCode
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
            <div className={viewcart.container}>
                <h4>CART</h4>
                <div className={viewcart.main}>
                    <div className={viewcart.productlist}>
                        {cartItems.map((item) => (
                            <div key={item.id} className={viewcart.carttable}>
                                <div className={viewcart.cartheader}>
                                    <span></span>
                                    <span>Product</span>
                                    <span>Price</span>
                                    <span>Quantity</span>
                                    <span>Subtotal</span>
                                </div>
                                <div className={viewcart.cartItem}>
                                    <button className={viewcart.removeBtn} onClick={() => removeFromCart(item.id)}>✕</button>
                                    <div className={viewcart.productname}>
                                        <img src={item.image} alt={item.name} className={viewcart.productImage} />
                                        <h5>{item.name}</h5>
                                    </div>
                                    <p>$ {item.price.toFixed(2)}</p>
                                    <div className={viewcart.quantity}>
                                        <button onClick={() => decreaseQty(item.id)}>−</button>
                                        <p>{item.quantity}</p>
                                        <button onClick={() => increaseQty(item.id)}>+</button>
                                    </div>
                                    <p>$ {(item.price * item.quantity).toFixed(2)}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className={viewcart.productprice}>
                        <div className={viewcart.priceheader}>
                            <h4>CART TOTALS</h4>
                        </div>
                        <div className={viewcart.productcost}>
                            <p>Subtotal <span>$ {cartSubtotal.toFixed(2)}</span></p>
                            <p>Total <span>$ {cartSubtotal.toFixed(2)}</span></p>
                        </div>
                        <div className={viewcart.productcheckout}>
                            {!coupon ? (
                                <p onClick={couponSubmit}>Have a coupon?</p>
                            ) : (
                                <div className={viewcart.couponform}>
                                    <div className={viewcart.inputbox}>
                                        <input type="text" value={couponCode} onChange={(e) => setCouponcode(e.target.value)} placeholder='Enter Your Coupon Code *' 
                                            className={`${viewcart.couponbox} ${error.name ? viewcart.errorinput : ''}`} />
                                        {error.couponCode && (<p style={{ fontSize: '12px', color: 'red' }}>{error.couponCode}</p>)}
                                        {success && (<p style={{ fontSize: '12px', color: 'green' }}>{success}</p>)}
                                    </div>
                                    <Props content={'APPLY'} fsize={'15px'} font={'var(--primary-font)'} bgcolor={'var(--second-color)'} 
                                        col={'var(--third-color)'} bord={'none'} rad={'0'} pad={'10px 23px'} 
                                        hbg={'var(--first-color)'} cursor={'pointer'} trans={'0.4s'} oncl={handleSubmit}
                                    />
                                </div>
                            )}
                        </div>
                        <div className={viewcart.productcheckoutbtn}>
                            <Link to={'/Checkout'}>
                                <Props content={'PROCEED TO CHECKOUT'} fsize={'18px'} font={'var(--primary-font)'} bgcolor={'var(--second-color)'} 
                                    col={'var(--third-color)'} bord={'none'} rad={'0'} pad={'20px'} 
                                    hbg={'var(--first-color)'} cursor={'pointer'} trans={'0.4s'}
                                />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Viewcart