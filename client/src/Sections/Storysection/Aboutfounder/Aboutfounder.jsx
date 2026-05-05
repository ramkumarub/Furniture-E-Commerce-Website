import React from 'react'
import aboutfounder from './aboutfounder.module.css'
import storyabout02 from '../../../Assets/story-about-02.jpg'

const Aboutfounder = () => {
  return (
    <>
        <div className={aboutfounder.container}>
            <div className={aboutfounder.about}>
                <h3>ABOUT THE FOUNDER</h3>
                <span></span>
                <p>
                    Proin nec ante eu sem luctus bibendum. Sed ut fringilla dolor. 
                    Morbi suscipit a nunc eu finibus. Nam rutrum mattis velit eget volutpat. 
                    Fusce egestas mi urna, id pulvinar ipsum dictum eget. Mauris in dolor velit. 
                    Vestibulum finibus felis non massa commodo molestie at id justo. 
                    Quisque sollicitudin elit sit amet facilisis euismod. 
                    Fusce at arcu sed libero lacinia dignissim id bibendum metus.
                </p>
                <p>
                    Nam rutrum mattis velit eget volutpat. Fusce egestas mi urna, id pulvinar ipsum dictum eget.
                </p>
            </div>
            <div className={aboutfounder.image}>
                <img src={storyabout02} alt='storyabout02' />
            </div>
        </div>
    </>
  )
}

export default Aboutfounder