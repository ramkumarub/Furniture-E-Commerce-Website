import React, { useState } from 'react'
import bedroom from './bedroom.module.css'
import { Link } from 'react-router-dom'
import product01a from '../../Assets/product-01-a.jpg'
import product01b from '../../Assets/product-01-b.jpg'
import product01c from '../../Assets/product-01-c.jpg'
import product02a from '../../Assets/product-02-a.jpg'
import product02b from '../../Assets/product-02-b.jpg'
import product02c from '../../Assets/product-02-c.jpg'
import product03a from '../../Assets/product-03-a.jpg'
import product03b from '../../Assets/product-03-b.jpg'
import product03c from '../../Assets/product-03-c.jpg'
import product04a from '../../Assets/product-04-a.jpg'
import product04b from '../../Assets/product-04-b.jpg'
import product04c from '../../Assets/product-04-c.jpg'
import product05a from '../../Assets/product-05-a.jpg'
import product05b from '../../Assets/product-05-b.jpg'
import product05c from '../../Assets/product-05-c.jpg'
import product06a from '../../Assets/product-06-a.jpg'
import product06b from '../../Assets/product-06-b.jpg'
import product06c from '../../Assets/product-06-c.jpg'

const Bedroom = () => {

    const productsData = [
        {
            _id : 1,
            name : 'Bellum Matte Pendant',
            variants : [
                { _id: 11, image: product01a, bgcolor: '#000000', oldprice: '$105.00', newprice: '$85.00' },
                { _id: 12, image: product01b, bgcolor: '#864a27', oldprice: '$120.00', newprice: '$95.00' },
                { _id: 13, image: product01c, bgcolor: '#e2ae90', oldprice: '$135.00', newprice: '$110.00' }
            ]
        },
        {
            _id : 2,
            name : 'Verge Brushed Clock',
            variants : [
                { _id: 21, image: product02a, bgcolor: '#000000', oldprice: '$150.00', newprice: '$120.00' },
                { _id: 22, image: product02b, bgcolor: '#864a27', oldprice: '$165.00', newprice: '$140.00' },
                { _id: 23, image: product02c, bgcolor: '#e2ae90', oldprice: '$180.00', newprice: '$155.00' }
            ]
        },
        {
            _id : 3,
            name : 'Cirrus Bar Stool',
            variants : [
                { _id: 31, image: product03a, bgcolor: '#000000', oldprice: '$220.00', newprice: '$180.00' },
                { _id: 32, image: product03b, bgcolor: '#864a27', oldprice: '$240.00', newprice: '$195.00' },
                { _id: 33, image: product03c, bgcolor: '#e2ae90', oldprice: '$260.00', newprice: '$210.00' }
            ]
        },
        {
            _id : 4,
            name : 'Mora Dome Table Lamp',
            variants : [
                { _id: 41, image: product04a, bgcolor: '#000000', oldprice: '$130.00', newprice: '$110.00' },
                { _id: 42, image: product04b, bgcolor: '#864a27', oldprice: '$145.00', newprice: '$125.00' },
                { _id: 43, image: product04c, bgcolor: '#e2ae90', oldprice: '$160.00', newprice: '$140.00' }
            ]
        },
        {
            _id : 5,
            name : 'Stratos Swivel Stool',
            variants : [
                { _id: 51, image: product05a, bgcolor: '#000000', oldprice: '$300.00', newprice: '$250.00' },
                { _id: 52, image: product05b, bgcolor: '#864a27', oldprice: '$325.00', newprice: '$275.00' },
                { _id: 53, image: product05c, bgcolor: '#e2ae90', oldprice: '$350.00', newprice: '$295.00' }
            ]
        },
        {
            _id : 6,
            name : 'Orbit Low Lounge Table',
            variants : [
                { _id: 61, image: product06a, bgcolor: '#000000', oldprice: '$400.00', newprice: '$350.00' },
                { _id: 62, image: product06b, bgcolor: '#864a27', oldprice: '$420.00', newprice: '$370.00' },
                { _id: 63, image: product06c, bgcolor: '#e2ae90', oldprice: '$450.00', newprice: '$390.00' }
            ]
        }
    ]

    const [sortOption, setSortOption] = useState('default')

    const sortedProducts = [...productsData].sort((a, b) => {

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

    const ProductCard = ({ product }) => {

        const [currentColor, setCurrentColor] = useState(product.variants[0])

        return (
            <div className={bedroom.image}>
                <Link to={`/product/${product._id}/Bedroom`}>
                    <img src={currentColor.image} alt={product.name} />
                </Link>
                <button className={bedroom.sale}>Sale!</button>
                <div className={bedroom.imagetext}>
                    <h2>{product.name}</h2>
                    <h5 style={{ display: 'flex', gap: '5px' }}>
                        <strike>{currentColor.oldprice}</strike>
                        <p style={{ color: '#313131' }}>{currentColor.newprice}</p>
                    </h5>
                    <div className={bedroom.buttons}>
                        {product.variants.map((item) => (
                            <div key={item._id}>
                                <button className={bedroom.currentbutton} onClick={() => setCurrentColor(item)} style={{ backgroundColor: item.bgcolor, cursor : 'pointer' }}></button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )
    }

  return (
    <div className={bedroom.container}>
        <div className={bedroom.main}>
            <h6><Link to={'/'}>Home</Link> / Bedroom</h6>
            <h1>BEDROOM</h1>
            <div className={bedroom.filterorder}>
                <h5>Showing 1 all 6 results</h5>
                <select name='filter' id='filter' value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
                    <option value='default'>Deafult Sorting</option>
                    <option value='popularity'>Sort by popularity</option>
                    <option value='rating'>Sort by average rating</option>
                    <option value='latest'>Sort by latest</option>
                    <option value='low'>Sort by price : low to high</option>
                    <option value='high'>Sort by price : high to low</option>
                </select>
            </div>
            <div className={bedroom.products}>
                {sortedProducts
                .map((product) => (
                    <ProductCard key={product._id} product={product} />
                ))}
            </div>
            <div className={bedroom.endproducts}>
                <p>No more products to show.</p>
            </div>
        </div>
    </div>
  )
}

export default Bedroom