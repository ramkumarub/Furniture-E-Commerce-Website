import React, { useState } from 'react'
import livingroom from './livingroom.module.css'
import { Link } from 'react-router-dom'
import product03a from '../../Assets/product-03-a.jpg'
import product03b from '../../Assets/product-03-b.jpg'
import product03c from '../../Assets/product-03-c.jpg'
import product05a from '../../Assets/product-05-a.jpg'
import product05b from '../../Assets/product-05-b.jpg'
import product05c from '../../Assets/product-05-c.jpg'
import product06a from '../../Assets/product-06-a.jpg'
import product06b from '../../Assets/product-06-b.jpg'
import product06c from '../../Assets/product-06-c.jpg'
import product08a from '../../Assets/product-08-a.jpg'
import product08b from '../../Assets/product-08-b.jpg'
import product08c from '../../Assets/product-08-c.jpg'
import product10a from '../../Assets/product-10-a.jpg'
import product10b from '../../Assets/product-10-b.jpg'
import product10c from '../../Assets/product-10-c.jpg'
import product16a from '../../Assets/product-16-a.jpg'
import product16b from '../../Assets/product-16-b.jpg'
import product16c from '../../Assets/product-16-c.jpg'

const Livingroom = () => {

    const productsData = [
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
        },
        {
            _id : 8,
            name : 'Aura Pedestal Table',
            variants : [
                { _id: 81, image: product08a, bgcolor: '#000000', oldprice: '$360.00', newprice: '$310.00' },
                { _id: 82, image: product08b, bgcolor: '#864a27', oldprice: '$380.00', newprice: '$330.00' },
                { _id: 83, image: product08c, bgcolor: '#e2ae90', oldprice: '$400.00', newprice: '$350.00' }
            ]
        },
        {
            _id : 10,
            name : 'Orbit Floating Table Lamp',
            variants : [
                { _id: 101, image: product10a, bgcolor: '#000000', oldprice: '$210.00', newprice: '$170.00' },
                { _id: 102, image: product10b, bgcolor: '#864a27', oldprice: '$230.00', newprice: '$190.00' },
                { _id: 103, image: product10c, bgcolor: '#e2ae90', oldprice: '$250.00', newprice: '$205.00' }
            ]
        },
        {
            _id : 16,
            name : 'Serene Funnel Lamp',
            variants : [
                { _id : 161, image : product16a, bgcolor : '#000000', oldprice : '$220.00', newprice : '$180.00' },
                { _id : 162, image : product16b, bgcolor : '#864a27', oldprice : '$240.00', newprice : '$200.00' },
                { _id : 163, image : product16c, bgcolor : '#e2ae90', oldprice : '$260.00', newprice : '$220.00' }
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
            <div className={livingroom.image}>
                <Link to={`/product/${product._id}/Living Room`}>
                    <img src={currentColor.image} alt={product.name} />
                </Link>
                <button className={livingroom.sale}>Sale!</button>
                <div className={livingroom.imagetext}>
                    <h2>{product.name}</h2>
                    <h5 style={{ display: 'flex', gap: '5px' }}>
                        <strike>{currentColor.oldprice}</strike>
                        <p style={{ color: '#313131' }}>{currentColor.newprice}</p>
                    </h5>
                    <div className={livingroom.buttons}>
                        {product.variants.map((item) => (
                            <div key={item._id}>
                                <button className={livingroom.currentbutton} onClick={() => setCurrentColor(item)} style={{ backgroundColor: item.bgcolor, cursor : 'pointer' }}></button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )
    }

  return (
    <div className={livingroom.container}>
        <div className={livingroom.main}>
            <h6><Link to={'/'}>Home</Link> / Living Room</h6>
            <h1>LIVING ROOM</h1>
            <div className={livingroom.filterorder}>
                <h5>Showing all 6 results</h5>
                <select name='filter' id='filter' value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
                    <option value='default'>Deafult Sorting</option>
                    <option value='popularity'>Sort by popularity</option>
                    <option value='rating'>Sort by average rating</option>
                    <option value='latest'>Sort by latest</option>
                    <option value='low'>Sort by price : low to high</option>
                    <option value='high'>Sort by price : high to low</option>
                </select>
            </div>
            <div className={livingroom.products}>
                {sortedProducts
                .map((product) => (
                    <ProductCard key={product._id} product={product} />
                ))}
            </div>
            <div className={livingroom.endproducts}>
                <p>No more products to show.</p>
            </div>
        </div>
    </div>
  )
}

export default Livingroom