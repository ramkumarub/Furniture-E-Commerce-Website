import React, { useEffect, useState } from 'react'
import shopall from './shopall.module.css'
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
import product07a from '../../Assets/product-07-a.jpg'
import product07b from '../../Assets/product-07-b.jpg'
import product07c from '../../Assets/product-07-c.jpg'
import product08a from '../../Assets/product-08-a.jpg'
import product08b from '../../Assets/product-08-b.jpg'
import product08c from '../../Assets/product-08-c.jpg'
import product09a from '../../Assets/product-09-a.jpg'
import product09b from '../../Assets/product-09-b.jpg'
import product09c from '../../Assets/product-09-c.jpg'
import product10a from '../../Assets/product-10-a.jpg'
import product10b from '../../Assets/product-10-b.jpg'
import product10c from '../../Assets/product-10-c.jpg'
import product11a from '../../Assets/product-11-a.jpg'
import product11b from '../../Assets/product-11-b.jpg'
import product11c from '../../Assets/product-11-c.jpg'
import product12a from '../../Assets/product-12-a.jpg'
import product12b from '../../Assets/product-12-b.jpg'
import product12c from '../../Assets/product-12-c.jpg'
import product13a from '../../Assets/product-13-a.jpg'
import product13b from '../../Assets/product-13-b.jpg'
import product13c from '../../Assets/product-13-c.jpg'
import product14a from '../../Assets/product-14-a.jpg'
import product14b from '../../Assets/product-14-b.jpg'
import product14c from '../../Assets/product-14-c.jpg'
import product15a from '../../Assets/product-15-a.jpg'
import product15b from '../../Assets/product-15-b.jpg'
import product15c from '../../Assets/product-15-c.jpg'
import product16a from '../../Assets/product-16-a.jpg'
import product16b from '../../Assets/product-16-b.jpg'
import product16c from '../../Assets/product-16-c.jpg'

const Shopall = () => {

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
        },
        {
            _id : 7,
            name : 'Plateau Low Table',
            variants : [
                { _id: 71, image: product07a, bgcolor: '#000000', oldprice: '$280.00', newprice: '$240.00' },
                { _id: 72, image: product07b, bgcolor: '#864a27', oldprice: '$300.00', newprice: '$260.00' },
                { _id: 73, image: product07c, bgcolor: '#e2ae90', oldprice: '$320.00', newprice: '$275.00' }
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
            _id : 9,
            name : 'Zenith Teardrop Vase',
            variants : [
                { _id: 91, image: product09a, bgcolor: '#000000', oldprice: '$90.00', newprice: '$70.00' },
                { _id: 92, image: product09b, bgcolor: '#864a27', oldprice: '$105.00', newprice: '$85.00' },
                { _id: 93, image: product09c, bgcolor: '#e2ae90', oldprice: '$120.00', newprice: '$95.00' }
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
            _id : 11,
            name : 'Solstice Minimalist Clock',
            variants : [
                { _id : 111, image : product11a, bgcolor : '#000000', oldprice : '$150.00', newprice : '$125.00' },
                { _id : 112, image : product11b, bgcolor : '#864a27', oldprice : '$165.00', newprice : '$140.00' },
                { _id : 113, image : product11c, bgcolor : '#e2ae90', oldprice : '$180.00', newprice : '$155.00' }
            ]
        },
        {
            _id : 12,
            name : 'Pill Silhouette Vase',
            variants : [
                { _id : 121, image : product12a, bgcolor : '#000000', oldprice : '$95.00', newprice : '$75.00' },
                { _id : 122, image : product12b, bgcolor : '#864a27', oldprice : '$110.00', newprice : '$90.00' },
                { _id : 123, image : product12c, bgcolor : '#e2ae90', oldprice : '$125.00', newprice : '$105.00' }
            ]
        },
        {
            _id : 13,
            name : 'Vesta Tapered Hanging Lamp',
            variants : [
                { _id : 131, image : product13a, bgcolor : '#000000', oldprice : '$260.00', newprice : '$220.00' },
                { _id : 132, image : product13b, bgcolor : '#864a27', oldprice : '$280.00', newprice : '$235.00' },
                { _id : 133, image : product13c, bgcolor : '#e2ae90', oldprice : '$300.00', newprice : '$250.00' }
            ]
        },
        {
            _id : 14,
            name : 'Luna Graphite Vase',
            variants : [
                { _id : 141, image : product14a, bgcolor : '#000000', oldprice : '$110.00', newprice : '$85.00' },
                { _id : 142, image : product14b, bgcolor : '#864a27', oldprice : '$125.00', newprice : '$100.00' },
                { _id : 143, image : product14c, bgcolor : '#e2ae90', oldprice : '$140.00', newprice : '$115.00' }
            ]
        },
        {
            _id : 15,
            name : 'Aura Slate Wall Clock',
            variants : [
                { _id : 151, image : product15a, bgcolor : '#000000', oldprice : '$175.00', newprice : '$145.00' },
                { _id : 152, image : product15b, bgcolor : '#864a27', oldprice : '$195.00', newprice : '$160.00' },
                { _id : 153, image : product15c, bgcolor : '#e2ae90', oldprice : '$210.00', newprice : '$175.00' }
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
    const [visibleCount, setVisibleCount] = useState(9)
    const [loading, setLoading] = useState(false)

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

    useEffect(() => {

        const handleScroll = () => {
            const scrollTop = window.scrollY
            const windowHeight = window.innerHeight
            const fullHeight = document.documentElement.scrollHeight

            if (scrollTop + windowHeight >= fullHeight - 50) {

                if (visibleCount < sortedProducts.length && !loading) {
                    setLoading(true)
                    setTimeout(() => {
                        setVisibleCount(sortedProducts.length)
                        setLoading(false)
                    }, 1000)
                }

            }

        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)

    },[visibleCount, sortedProducts.length, loading])

    const ProductCard = ({ product }) => {

        const [currentColor, setCurrentColor] = useState(product.variants[0])

        return (
            <div className={shopall.image}>
                <Link to={`/product/${product._id}/Shopall`}>
                    <img src={currentColor.image} alt={product.name} />
                </Link>
                <button className={shopall.sale}>Sale!</button>
                <div className={shopall.imagetext}>
                    <h2>{product.name}</h2>
                    <h5 style={{ display: 'flex', gap: '5px' }}>
                        <strike>{currentColor.oldprice}</strike>
                        <p style={{ color: '#313131' }}>{currentColor.newprice}</p>
                    </h5>
                    <div className={shopall.buttons}>
                        {product.variants.map((item) => (
                            <div key={item._id}>
                                <button className={shopall.currentbutton} onClick={() => setCurrentColor(item)} style={{ backgroundColor: item.bgcolor, cursor : 'pointer' }}></button>
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
                <h5>Showing 1 - {visibleCount} of {sortedProducts.length} results</h5>
                <select name='filter' id='filter' value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
                    <option value='default'>Deafult Sorting</option>
                    <option value='popularity'>Sort by popularity</option>
                    <option value='rating'>Sort by average rating</option>
                    <option value='latest'>Sort by latest</option>
                    <option value='low'>Sort by price : low to high</option>
                    <option value='high'>Sort by price : high to low</option>
                </select>
            </div>
            <div className={shopall.products}>
                {sortedProducts.slice(0, visibleCount).map((product) => (
                    <ProductCard key={product._id} product={product} />
                ))}
            </div>
            {loading && (
                <div className={shopall.loader}>
                    <div className={shopall.spinner}></div>
                </div>
            )}
            {visibleCount >= sortedProducts.length && (
                <div className={shopall.endproducts}>
                    <p>No more products to show.</p>
                </div>
            )}
        </div>
    </div>
  )
}

export default Shopall