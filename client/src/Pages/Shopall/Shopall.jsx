import React, { useEffect, useState } from 'react'
import shopall from './shopall.module.css'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { MdKeyboardDoubleArrowLeft } from "react-icons/md"
import { MdKeyboardDoubleArrowRight } from "react-icons/md"

const Shopall = () => {

    const [sortOption, setSortOption] = useState('default')
    const [products, setProducts] = useState([])
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)

    const sortedProducts = [...products].sort((a, b) => {

        const priceA = parseFloat(a.variants[0].newprice.replace('$', ''))
        const priceB = parseFloat(b.variants[0].newprice.replace('$', ''))

        if (sortOption === 'low') {
            return priceA - priceB
        }

        if (sortOption === 'high') {
            return priceB - priceA
        }

        if (sortOption === "popularity") {
            return Math.random() - 0.5
        }
        if (sortOption === "rating") {
            return Math.random() - 0.5
        }
        if (sortOption === "latest") {
            return Math.random() - 0.5
        }

        return 0

    })

    useEffect(() => {
        const fetchProducts = async() => {
            try {
                const res = await axios.get(`https://furniture-e-commerce-website.onrender.com/api/products?page=${page}&limit=6`)
                setProducts(res.data.data)
                setTotalPages(res.data.totalPages)
            }
            catch (error) {
                console.log(error)
                setProducts([])
            }
        }
        fetchProducts()
    }, [page])

    const ProductCard = ({ product }) => {

        const [currentColor, setCurrentColor] = useState(product.variants[0])

        return (
            <div className={shopall.image}>
                <Link to={`/product/${product._id}/shopall`}>
                    <img src={currentColor.image} alt={product.name} />
                </Link>
                <button className={shopall.sale}>Sale!</button>
                <div className={shopall.imagetext}>
                    <h2>{product.name}</h2>
                    <h5 style={{ display: 'flex', gap: '5px' }}>
                        <strike>{"$"}{currentColor.oldprice}</strike>
                        <p style={{ color: '#313131' }}>{"$"}{currentColor.newprice}</p>
                    </h5>
                    {
                        currentColor.stock > 0 
                        ?
                        <p style={{ color: 'green', fontSize: '15px' }}>
                            In Stock : {currentColor.stock}
                        </p>
                        :
                        <p style={{ color: 'red', fontSize: '15px' }}>
                            Out of Stock
                        </p>
                    }
                    <div className={shopall.buttons}>
                        {product.variants.map((item) => (
                            <div key={item._id}>
                                <button className={shopall.currentbutton} onClick={() => setCurrentColor(item)} style={{ backgroundColor: item.color }}></button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )
    }

  return (
    <div className={shopall.container}>
        <div className={shopall.main}>
            <h6><Link to={'/'}>Home</Link> / Shop</h6>
            <h1>SHOP</h1>
            <div className={shopall.filterorder}>
                <h5>Showing page {page} of {totalPages}</h5>
                <select name='filter' id='filter' value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
                    <option value='default'>Default Sorting</option>
                    <option value='popularity'>Sort by popularity</option>
                    <option value='rating'>Sort by average rating</option>
                    <option value='latest'>Sort by latest</option>
                    <option value='low'>Sort by price : low to high</option>
                    <option value='high'>Sort by price : high to low</option>
                </select>
            </div>
            <div className={shopall.products}>
                {sortedProducts.length === 0 ? (
                    <h2>No Products Found</h2>
                ) : (
                    sortedProducts.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))
                )}
            </div>
            <div className={shopall.pagination}>
                <button disabled={page === 1} onClick={() => setPage(page - 1)}>
                    <MdKeyboardDoubleArrowLeft />
                </button>
                {[...Array(totalPages)].map((_, index) => (
                    <button key={index} onClick={() => setPage(index + 1)} className={page === index + 1 ? shopall.activepage : ""}>
                        {index + 1}
                    </button>
                ))}
                <button disabled={page === totalPages} onClick={() => setPage(page + 1)}>
                    <MdKeyboardDoubleArrowRight />
                </button>                
            </div>
        </div>
    </div>
  )
}

export default Shopall