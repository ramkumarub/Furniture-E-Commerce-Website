import React, { useState } from 'react';
import featured from './featured.module.css';
import Props from '../../../Props/Props'
import product01a from '../../../Assets/product-01-a.jpg'
import product01b from '../../../Assets/product-01-b.jpg'
import product01c from '../../../Assets/product-01-c.jpg'
import product04a from '../../../Assets/product-04-a.jpg'
import product04b from '../../../Assets/product-04-b.jpg'
import product04c from '../../../Assets/product-04-c.jpg'
import product05a from '../../../Assets/product-05-a.jpg'
import product05b from '../../../Assets/product-05-b.jpg'
import product05c from '../../../Assets/product-05-c.jpg'
import product10a from '../../../Assets/product-10-a.jpg'
import product10b from '../../../Assets/product-10-b.jpg'
import product10c from '../../../Assets/product-10-c.jpg'
import product14a from '../../../Assets/product-14-a.jpg'
import product14b from '../../../Assets/product-14-b.jpg'
import product14c from '../../../Assets/product-14-c.jpg'
import product15a from '../../../Assets/product-15-a.jpg'
import product15b from '../../../Assets/product-15-b.jpg'
import product15c from '../../../Assets/product-15-c.jpg'
import arrivalsbg from '../../../Assets/arrivals-bg.jpg'
import lamp001 from '../../../Assets/lamp-001.png'
import { Link } from 'react-router-dom';

const Featured = () => {
    const productsData = [
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
            _id : 14,
            name : 'Luna Graphite Vase',
            variants : [
                { _id : 141, image : product14a, bgcolor : '#000000', oldprice : '$110.00', newprice : '$85.00' },
                { _id : 142, image : product14b, bgcolor : '#864a27', oldprice : '$125.00', newprice : '$100.00' },
                { _id : 143, image : product14c, bgcolor : '#e2ae90', oldprice : '$140.00', newprice : '$115.00' }
            ]
        },
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
            _id : 6,
            name : 'Orbit Floating Table Lamp',
            variants : [
                { _id: 61, image: product10a, bgcolor: '#000000', oldprice: '$210.00', newprice: '$170.00' },
                { _id: 62, image: product10b, bgcolor: '#864a27', oldprice: '$230.00', newprice: '$190.00' },
                { _id: 63, image: product10c, bgcolor: '#e2ae90', oldprice: '$250.00', newprice: '$205.00' }
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
        }
    ]

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

    const ProductCard = ({ product }) => {

        const [currentColor, setCurrentColor] = useState(product.variants[0])

        return (
            <div className={featured.image}>
                <Link to={`/product/${product._id}/Featured`}>
                    <img src={currentColor.image} alt={product.name} />
                </Link>
                <button className={featured.sale}>Sale!</button>
                <div className={featured.imagetext}>
                    <h2>{product.name}</h2>
                    <h5 style={{ display: 'flex', gap: '5px' }}>
                        <strike>{currentColor.oldprice}</strike>
                        <p style={{ color: '#313131' }}>{currentColor.newprice}</p>
                    </h5>
                   <div className={featured.buttons}>
                        {product.variants.map((item) => (
                            <div key={item._id}>
                                <button className={featured.currentbutton} onClick={() => setCurrentColor(item)} style={{ backgroundColor: item.bgcolor }}></button>
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
                    {productsData.map((product) => (
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