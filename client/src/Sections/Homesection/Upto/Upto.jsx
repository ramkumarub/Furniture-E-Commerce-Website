import React from 'react'
import upto from './upto.module.css'
import Props from '../../../Props/Props'
import { Link } from 'react-router-dom'

const Upto = () => {
    return (
        <>
            <div className={upto.container}>
                <h6>BLACK FRIDAY IN JULY</h6>
                <h1>UP TO 50% OFF</h1>
                <h4>HUNDREDS OF STYLE AVAILABLE</h4>
                <Link to={'/Shopall'}>
                    <Props content={'SHOP NOW'} fsize={'15px'} font={'var(--primary-font)'} bgcolor={'var(--second-color)'} 
                            col={'var(--third-color)'} bord={'none'} rad={'0'} pad={'10px 23px'} 
                            hbg={'var(--first-color)'} cursor={'pointer'} trans={'0.4s'}
                    />
                </Link>
            </div>
        </>
    )
}

export default Upto