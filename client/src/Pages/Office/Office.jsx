import React, { useEffect, useState } from 'react'
import office from './office.module.css'
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
                const slug = "office"
                const res = await axios.get(`http://localhost:8000/api/products/categories/${slug}?page=${page}&limit=6`)
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
            <div className={office.image}>
                <Link to={`/product/${product._id}/${product.categories.find((cat) => window.location.pathname.includes(cat.slug))?.slug || product.categories?.[0]?.slug || "shopall"}`}>
                    <img src={currentColor.image} alt={product.name} />
                </Link>
                <button className={office.sale}>Sale!</button>
                <div className={office.imagetext}>
                    <h2>{product.name}</h2>
                    <h5 style={{ display: 'flex', gap: '5px' }}>
                        <strike>{currentColor.oldprice}</strike>
                        <p style={{ color: '#313131' }}>{currentColor.newprice}</p>
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
                    <div className={office.buttons}>
                        {product.variants.map((item) => (
                            <div key={item._id}>
                                <button className={office.currentbutton} onClick={() => setCurrentColor(item)} style={{ backgroundColor: item.color, cursor : 'pointer' }}></button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )
    }

  return (
    <div className={office.container}>
        <div className={office.main}>
            <h6><Link to={'/'}>Home</Link> / Office</h6>
            <h1>OFFICE</h1>
            <div className={office.filterorder}>
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
            <div className={office.products}>
                {sortedProducts.length === 0 ? (
                    <h2>No Products Found</h2>
                ) : (
                    sortedProducts.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))
                )}
            </div>
            <div className={office.pagination}>
                <button disabled={page === 1} onClick={() => setPage(page - 1)}>
                    <MdKeyboardDoubleArrowLeft />
                </button>
                {[...Array(totalPages)].map((_, index) => (
                    <button key={index} onClick={() => setPage(index + 1)} className={page === index + 1 ? office.activepage : ""}>
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