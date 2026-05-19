import React from 'react'
import stillneedhelp from './stillneedhelp.module.css'
import Props from '../../../Props/Props'
import { Link } from 'react-router-dom'

const Stillneedhelp = () => {
  return (
    <>
        <div className={stillneedhelp.container}>
            <span></span>
            <h2>STILL NEED HELP?</h2>
            <Link to={'/contact'}>
                <Props content={'CONTACT US'} fsize={'15px'} font={'var(--primary-font)'} bgcolor={'var(--second-color)'} 
                    col={'var(--third-color)'} bord={'none'} rad={'0'} pad={'10px 23px'} 
                    hbg={'var(--first-color)'} cursor={'pointer'} trans={'0.4s'}
                />
            </Link>
        </div>
    </>
  )
}

export default Stillneedhelp