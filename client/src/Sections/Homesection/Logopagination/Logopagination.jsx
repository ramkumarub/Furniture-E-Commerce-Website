import React, { useState, useEffect } from 'react'
import { Swiper, SwiperSlide } from "swiper/react"
import { Pagination, Autoplay } from "swiper/modules"
import logopagination from './logopagination.module.css'
import axios from 'axios'
import "swiper/css";
import "swiper/css/pagination";

const Logopagination = () => {

    const [logos, setLogos] = useState([])
    
    useEffect(() => {
        const fetchLogos = async() => {
            try {
                const res = await axios.get(`https://furniture-e-commerce-website.onrender.com/api/logos`)
                setLogos(res.data.data)
            }
            catch (error) {
                console.log(error)
                setLogos([])
            }
        }
        fetchLogos()
    }, [])

    return (
        <>
            <div className={logopagination.container}>
                <Swiper modules={[Pagination, Autoplay]} spaceBetween={30} slidesPerView={4} pagination={{ clickable: true }} autoplay={{ delay: 2500 }}
                    breakpoints={{0: { slidesPerView : 1 }, 480: { slidesPerView: 2 }, 768: { slidesPerView: 3 }, 1024: { slidesPerView: 4} }}>
                    {logos.map((logo) => (
                        <SwiperSlide key={logo._id}>
                            <div className={logopagination.logobox}>
                                <img src={logo.image} alt="logo" />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </>
    )
}

export default Logopagination