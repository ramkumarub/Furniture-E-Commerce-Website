import React from "react";
import { useCart } from "../Context/Cartcontext";
import cartdrawer from "./cartdrawer.module.css";
import Props from "../Props/Props";
import { Link } from 'react-router-dom'

const CartDrawer = ({ isOpen, setIsOpen }) => {

    const { cartItems, removeFromCart, decreaseQty, increaseQty, cartSubtotal } = useCart()

    if (!isOpen) return null;

    return (
        <>
        <div className={cartdrawer.cartOverlay} onClick={() => setIsOpen(false)}></div>
        <div className={cartdrawer.cartDrawer}>
            <div className={cartdrawer.cartHeader}>
                <h2>Shopping Cart</h2>
                <button onClick={() => setIsOpen(false)}>✕</button>
            </div>
            {cartItems.length === 0 ? (
                <div className={cartdrawer.emptyCart}>
                    <p>No products in the cart.</p>
                    <Link to={'/shopall'} onClick={() => setIsOpen(false)}>
                        <Props content={'CONTINUE SHOPPING'} fsize={'15px'} font={'var(--primary-font)'} bgcolor={'var(--second-color)'} 
                            col={'var(--third-color)'} bord={'none'} rad={'0'} pad={'10px 23px'} 
                            hbg={'var(--first-color)'} cursor={'pointer'} trans={'0.4s'}
                        />
                    </Link>
                </div>
            ) : (
            <>
            <div className={cartdrawer.cartContent}>
                {cartItems.map((item) => (
                    <div key={`${item.productId}-${item.variantId}`} className={cartdrawer.cartItem}>
                        <img src={item.image} alt={item.name} className={cartdrawer.productImage} />
                        <div className={cartdrawer.itemDetails}>
                            <h4>{item.name}</h4>
                            <div className={cartdrawer.quantity}>
                                <button onClick={() => decreaseQty(item.productId, item.variantId)}>−</button>
                                <p>{item.quantity}</p>
                                <button onClick={() => increaseQty(item.productId, item.variantId)}
                                    disabled={!item.stock || item.quantity >= item.stock}>+
                                </button>                
                            </div>
                            <p className={cartdrawer.itemPrice}>
                                $ {(item.price)} * {(item.quantity)} =
                                $ {(item.price * item.quantity).toFixed(2)}
                            </p>
                        </div>
                        <button className={cartdrawer.removeBtn} onClick={() => removeFromCart(item.productId, item.variantId)}>✕</button>
                    </div>
                ))}
            </div>
            <div className={cartdrawer.cartFooter}>
                <h3>
                    <span>Subtotal</span>
                    <span style={{color : 'rgb(58, 58, 58)'}}>${cartSubtotal.toFixed(2)}</span>
                </h3>
                <div className={cartdrawer.footerButton}>
                    <Link to={'/viewcart'} onClick={() => setIsOpen(false)}>
                        <Props content={'VIEW CART'} fsize={'15px'} font={'var(--primary-font)'} bgcolor={'var(--second-color)'} 
                            col={'var(--third-color)'} bord={'none'} rad={'0'} pad={'10px 23px'} 
                            hbg={'var(--first-color)'} cursor={'pointer'} trans={'0.4s'}
                        />
                    </Link>
                    <Link to={'/checkout'} onClick={() => setIsOpen(false)}>
                        <Props content={'CHECKOUT'} fsize={'15px'} font={'var(--primary-font)'} bgcolor={'var(--second-color)'} 
                            col={'var(--third-color)'} bord={'none'} rad={'0'} pad={'10px 23px'} 
                            hbg={'var(--first-color)'} cursor={'pointer'} trans={'0.4s'}
                        />
                    </Link>
                </div>
            </div>
            </>
            )}
        </div>
        </>
    )
}

export default CartDrawer;