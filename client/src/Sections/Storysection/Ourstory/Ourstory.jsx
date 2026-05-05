import React from 'react'
import ourstory from './ourstory.module.css'
import storyabout01 from '../../../Assets/story-about-01.jpg'

const Ourstory = () => {
    return (
        <>
            <div className={ourstory.container}>
                <h6>ABOUT US</h6>
                <h1>OUR STORY</h1>
                <span></span>
                <img src={storyabout01} alt='storyabout01' />
            </div>
        </>
    )
}

export default Ourstory
