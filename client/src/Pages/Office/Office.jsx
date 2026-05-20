import React, { useEffect, useState, useMemo } from 'react'
import office from './office.module.css'
import { Link, useLocation } from 'react-router-dom'
import { useProducts } from '../../Context/Productcontext'
import { MdKeyboardDoubleArrowLeft } from "react-icons/md"
import { MdKeyboardDoubleArrowRight } from "react-icons/md"

const ProductCard = ({ product }) => {

    const location = useLocation()
    const [currentColor, setCurrentColor] = useState(product.variants[0])

    return (
        <div className={office.image}>
            <Link to={`/product/${product._id}/${product.categories?.find((cat) => location.pathname.includes(cat.slug))?.slug || "shopall"}`}>
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
                            <button className={office.currentbutton} onClick={() => setCurrentColor(item)} style={{ backgroundColor: item.color, cursor: 'pointer' }}></button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

const Shopall = () => {

    const [sortOption, setSortOption] = useState('default')
    const [page, setPage] = useState(1)
    const { products, loading } = useProducts()

    useEffect(() => {
        setPage(1)
    }, [sortOption])

    const officeProducts = products.filter((product) => product.categories?.some((cat) => cat.slug === "office"))

    const sortedProducts = useMemo(() => {
        return [...officeProducts].sort((a, b) => {

            const priceA = parseFloat(a.variants?.[0]?.newprice?.replace('$', '') || 0)
            const priceB = parseFloat(b.variants?.[0]?.newprice?.replace('$', '') || 0)

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
    }, [officeProducts, sortOption])

    const itemsPerPage = 6
    const totalPages = Math.ceil(officeProducts.length / itemsPerPage) || 1
    const currentProducts = sortedProducts.slice((page - 1) * itemsPerPage, page * itemsPerPage)

    if (loading) {
        return <h1>Loading...</h1>
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
                {currentProducts.length === 0 ? (
                    <h2>No Products Found</h2>
                ) : (
                    currentProducts.map((product) => (
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