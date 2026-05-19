import React, { useState } from 'react'
import relatedpro from './relatedproducts.module.css'
import { Link } from 'react-router-dom'

const Relatedproducts = ({ relatedProducts, currentCategory }) => {

    const [selectedVariants, setSelectedVariants] = useState({})

    const handleColorChange = (productId, variant) => {
        setSelectedVariants(prev => ({
            ...prev,
            [productId]: variant
        }))
    }
    console.log(relatedProducts)

    return (
        <div className={relatedpro.container}>
            <div className={relatedpro.related}>
                <h2>RELATED PRODUCTS</h2>
                <div className={relatedpro.products}>
                    {relatedProducts.map((item) => {
                        const selected = selectedVariants[item._id] || item?.variants[0] || 
                        {image : "", odprice : "", newprice : "", color : "ccc"}
                        return (
                            <div key={item._id} className={relatedpro.card}>
                                <Link to={`/product/${item._id}/${currentCategory}`}>
                                    <img src={selected.image} alt={item.name} />
                                </Link>
                                <button className={relatedpro.sale}>Sale!</button>
                                <div className={relatedpro.imagetext}>
                                    <h2>{item?.name}</h2>
                                    <h5 style={{ display: "flex", gap: "5px" }}>
                                        <strike>{selected.oldprice}</strike>
                                        <p style={{ color: "#313131" }}>{selected.newprice}</p>
                                    </h5>
                                    <div className={relatedpro.buttons}>
                                        {item?.variants?.slice(0, 3)?.map((variant) => (
                                            <button
                                                key={variant._id}
                                                className={relatedpro.currentbutton}
                                                onClick={() => handleColorChange(item._id, variant)}
                                                style={{backgroundColor: variant.color, cursor: "pointer"}}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Relatedproducts