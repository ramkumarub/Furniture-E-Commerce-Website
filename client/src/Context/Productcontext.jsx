import React, { createContext, useContext, useEffect, useState } from "react"
import axios from "axios"

const ProductContext = createContext()

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    
    const getProducts = async () => {
        try {
            setLoading(true)
            const res = await axios.get(`https://furniture-e-commerce-website.onrender.com/api/products`)
            setProducts(res.data.data)
        }
        catch (error) {
            console.log(error)
            setError(error.message)
        } 
        finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getProducts()
    }, [])

  return (
    <ProductContext.Provider value={{ products, loading, error,getProducts }}>
        { children }
    </ProductContext.Provider>
  )
}

export const useProducts = () => useContext(ProductContext)