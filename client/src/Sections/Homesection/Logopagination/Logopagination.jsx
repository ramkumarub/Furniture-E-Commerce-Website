import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import logopagination from './logopagination.module.css'
import logo1 from '../../../Assets/logo-001.png'
import logo2 from '../../../Assets/logo-002.png'
import logo3 from '../../../Assets/logo-003.png'
import logo4 from '../../../Assets/logo-004.png'
import logo5 from '../../../Assets/logo-005.png'
import logo6 from '../../../Assets/logo-006.png'
import logo7 from '../../../Assets/logo-007.png'
import logo8 from '../../../Assets/logo-008.png'

import "swiper/css";
import "swiper/css/pagination";

const Logopagination = () => {

    const logos = [
        { image: logo1 },
        { image: logo2 },
        { image: logo3 },
        { image: logo4 },
        { image: logo5 },
        { image: logo6 },
        { image: logo7 },
        { image: logo8 },
    ];

    return (
        <>
            <div className={logopagination.container}>
                <Swiper modules={[Pagination, Autoplay]} spaceBetween={30} slidesPerView={6} pagination={{ clickable: true }} autoplay={{ delay: 2500 }}
                    breakpoints={{ 150: { slidesPerView: 2 }, 768: { slidesPerView: 3 }, 1024: { slidesPerView: 6} }}>
                    {logos.map((logo, index) => (
                        <SwiperSlide key={index}>
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