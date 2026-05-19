import React, { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {

  const [cartItems, setCartItems] = useState(() => {
    const storedCart = localStorage.getItem('cart')
    return storedCart ? JSON.parse(storedCart) : []
  })

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems))
  },[cartItems])

  const addToCart = (product) => { 
    const exists = cartItems.find((item) => 
      item.productId === product.productId &&
      item.variantId === product.variantId
    )

    if (exists) {
      setCartItems(cartItems.map((item) =>
        item.productId === product.productId && 
        item.variantId === product.variantId
        ? {...item, quantity: item.quantity + product.quantity} : item))
    } 
    else {
      setCartItems([...cartItems,{
        id: product.id,
        productId: product.productId,
        variantId: product.variantId,
        name: product.name,
        color: product.color,
        price: Number(product.price),
        quantity: product.quantity,
        image: product.image,
        stock: product.stock
      }])
    }
  }

  const removeFromCart = (productId, variantId) => {
    setCartItems(cartItems.filter((item) => 
      !(
        item.productId === productId &&
        item.variantId === variantId
      )
    ))
  }

  const decreaseQty = (productId, variantId) => {
    setCartItems(cartItems.map((item) => 
      item.productId === productId &&
      item.variantId === variantId
      ? { ...item, quantity: item.quantity - 1 } : item)
      .filter((item) => item.quantity > 0))
  }

  const increaseQty = (productId, variantId) => {
  setCartItems(cartItems.map((item) => {
      if (item.productId === productId && item.variantId === variantId) {
        return {...item, quantity: item.quantity + 1}
      }
      return item
    }))
  }
  
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0)
  
  const cartSubtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)

  return (
    <CartContext.Provider value={{ cartItems, addToCart, cartCount, removeFromCart, decreaseQty, increaseQty, cartSubtotal, setCartItems }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);