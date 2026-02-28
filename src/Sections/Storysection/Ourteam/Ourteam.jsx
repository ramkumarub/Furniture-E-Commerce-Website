import React from 'react'
import ourteam from './ourteam.module.css'

const Ourteam = () => {
    return (
        <>
            <div className={ourteam.container}>
                <div className={ourteam.main}>
                    <div className={ourteam.aboutus}>
                        <h6>ABOUT US</h6>
                        <h1>OUR TEAM IS WHAT WE VALUE THE MOST</h1>
                    </div>
                    <div className={ourteam.aboutuscontent}>
                        <h4>WITH GREAT PEOPLE, MODERN AND COOL PRODUCTS EMERGE.</h4>
                        <span>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            Sed rhoncus eget enim eget tincidunt. In finibus nisi ex,
                            eu interdum urna euismod sit amet. Morbi sollicitudin in magna sed tristique.
                            Nulla pharetra sapien eros, sit amet bibendum nibh consectetur quis.
                            Curabitur tortor dolor, fringilla eu fringilla id, dignissim in urna.
                            Nulla varius dolor ac eros posuere, nec interdum justo condimentum.
                            Phasellus lacinia sit amet tellus at pulvinar. Maecenas faucibus porta quam.
                        </span>
                        <span>
                            Ut in lorem ullamcorper velit facilisis pellentesque.
                            In tincidunt metus eget arcu congue, ac aliquam velit ultricies.
                            Aliquam posuere eu arcu et elementum. Donec pulvinar eget orci et pellentesque.
                            Aenean at ultricies quam. Nunc feugiat sapien quis pharetra tincidunt.
                            Etiam a viverra nulla. Pellentesque consectetur libero est, sed ullamcorper diam convallis ac.
                            Praesent a convallis ante. Suspendisse potenti. Sed sed cursus erat, et auctor metus.
                        </span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Ourteam