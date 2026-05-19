import React, { useState, useEffect } from 'react'
import category from './category.module.css'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Category = () => {

    const [categories, setCategories] = useState([])

    useEffect(() => {
        try {
            const fetchCategories = async() => {
                const res = await axios.get(`https://furniture-e-commerce-website.onrender.com/api/categories`)
                setCategories(res.data.data)
            }
            fetchCategories()
        }
        catch (error) {
            console.log(error)
            setCategories([])
        }
    }, [])

  return (
    <>
    <div className={category.container}>
        <div className={category.title}>
            <h6>SHOP BY CATEGORY</h6>
            <h2>SHOP BY CATEGORY</h2>
            <span></span>
        </div>
        <div className={category.products}>
            {categories.map((item) => (
                <Link to={item.slug} className={category.link} key={item._id}>
                    <div className={category.image}>
                        <img src={item.image} alt={item.name} />
                        <div className={category.imagetext}>
                            <h2>{item.name}</h2>
                            <h5>{item.productCount}{item.productCount === 1 ? " PRODUCT" : " PRODUCTS"}</h5>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    </div>
    </>
  )
}

export default Category