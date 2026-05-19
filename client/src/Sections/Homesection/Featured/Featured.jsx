import React, { useState, useEffect } from 'react';
import featured from './featured.module.css';
import Props from '../../../Props/Props'
import lamp001 from '../../../Assets/lamp-001.png'
import { Link } from 'react-router-dom';
import axios from 'axios'
import arrivalsbg from '../../../Assets/arrivals-bg.jpg'

const Featured = () => {

    const [products, setProducts] = useState([])

    const reviewData = [
        {
            _id : 1,
            rating : '⭐⭐⭐⭐⭐',
            reviewercontent : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis.',
            reviewername : 'MARIA OLIVER'
        },
        {
            _id : 2,
            rating : '⭐⭐⭐⭐⭐',
            reviewercontent : 'Cras vel pellentesque odio, in vestibulum dolor. In commodo ligula massa, tristique fermentum enim hendrerit faucibus. Etiam facilisis justo sed tortor vehicula mollis. Duis vel vehicula diam.',
            reviewername : 'MARK JUSTIN'
        },
        {
            _id : 3,
            rating : '⭐⭐⭐⭐⭐',
            reviewercontent : 'Morbi in leo viverra, elementum risus vitae, commodo lorem. Quisque a mollis.',
            reviewername : 'JAMIE STOCK'
        }
    ]

    useEffect(() => {
        const fetchProducts = async() => {
            try {
                const res = await axios.get(`http://localhost:8000/api/products`)
                const allProducts = res.data.data

                const randomProducts = [...allProducts].sort(() => Math.random() - 0.5).slice(0, 6)
                setProducts(randomProducts)
            }
            catch (error) {
                console.log(error)
                setProducts([])
            }
        }
        fetchProducts()
    }, [])

    const ProductCard = ({ product }) => {

        const [currentColor, setCurrentColor] = useState(product.variants[0])

        return (
            <div className={featured.image}>
                <Link to={`/product/${product._id}/${product.categories?.[0]?.slug || "shopall"}`}>
                    <img src={currentColor.image} alt={product.name} />
                </Link>
                <button className={featured.sale}>Sale!</button>
                <div className={featured.imagetext}>
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
                   <div className={featured.buttons}>
                        {product.variants.map((item) => (
                            <div key={item._id}>
                                <button className={featured.currentbutton} onClick={() => setCurrentColor(item)} style={{ backgroundColor: item.color }}></button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )
    }
    return (
        <>
            <div className={featured.container}>
                <div className={featured.title}>
                    <h6>SHOP BY CATEGORY</h6>
                    <h2>FEATURED PRODUCTS</h2>
                    <span></span>
                </div>
                <div className={featured.products}>
                    {products.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>

                <div className={featured.arrivals}>
                    <div className={featured.arrivalsimg}>
                        <img src={arrivalsbg} alt='new-arrivals' />
                        <div className={featured.arrivalscontent}>
                            <h6>NEW ARRIVALS</h6>
                            <h2>BRAND NEW, MODERN LAMPS COLLECTION</h2>
                            <h4>IDEAL FOR OFFICES, BEDROOMS AND ALL IN BETWEEN</h4>
                        </div>
                    </div>
                    <div className={featured.productlamp}>
                        <div className={featured.productimg}>
                            <img src={lamp001} alt='Orbit Floating Table Lamp' />
                            <h2>Orbit Floating Table Lamp</h2>
                        </div>
                        <div className={featured.productpurchase}>
                            <h5 style={{ display: 'flex', gap: '5px' }}>
                                <strike>$125.00</strike>
                                <span style={{ color: '#313131' }}>$99.00</span>
                            </h5>
                            <Props content={'SELECT OPTIONS'} fsize={'15px'} font={'var(--primary-font)'} bgcolor={'var(--second-color)'} 
                                    col={'var(--third-color)'} bord={'none'} rad={'0'} pad={'10px 23px'} 
                                    hbg={'var(--first-color)'} cursor={'pointer'} trans={'0.4s'}
                            />
                        </div>
                    </div>
                </div>

                <div className={featured.reviews}>
                    {reviewData.map((item) => (
                        <div className={featured.reviewsdetail} key={item._id}>
                            <div className={featured.reviewperson}>
                                <span>{item.rating}</span>
                                <h4>{item.reviewercontent}</h4>
                                <h6>{item.reviewername}</h6>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Featured