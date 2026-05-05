import React from 'react'
import category from './category.module.css'
import category1 from '../../../Assets/category-01.jpg'
import category2 from '../../../Assets/category-02.jpg'
import category3 from '../../../Assets/category-03.jpg'
import category4 from '../../../Assets/category-04.jpg'
import { Link } from 'react-router-dom'

const Category = () => {

    const itemCategory = [
        {
            _id : 1,
            image : category1,
            product : 'BEDROOM',
            productCount : '6 PRODUCTS',
            path : '/Bedroom'
        },
        {
            _id : 2,
            image : category2,
            product : 'DECOR',
            productCount : '9 PRODUCTS',
            path : '/Decor'
        },
        {
            _id : 3,
            image : category3,
            product : 'LIVING ROOM',
            productCount : '6 PRODUCTS',
            path : '/Livingroom'
        },
        {
            _id : 4,
            image : category4,
            product : 'OFFICE',
            productCount : '11 PRODUCTS',
            path : '/Office'
        }
    ]

  return (
    <>
    <div className={category.container}>
        <div className={category.title}>
            <h6>SHOP BY CATEGORY</h6>
            <h2>SHOP BY CATEGORY</h2>
            <span></span>
        </div>
        <div className={category.products}>
            {itemCategory.map((item) => (
                <Link to={item.path} className={category.link} key={item._id}>
                    <div className={category.image}>
                        <img src={item.image} alt={item.product} />
                        <div className={category.imagetext}>
                            <h2>{item.product}</h2>
                            <h5>{item.productCount}</h5>
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