import React from 'react'
import props from './props.module.css'

const Props = ({ oncl, content, fsize, font, bgcolor, col, bord, rad, pad, hbg, cursor, trans, dis }) => {
  return (
    <>
    <button onClick={oncl} style={{fontSize : fsize, fontFamily : font, 
        backgroundColor : bgcolor, color : col, border : bord, 
        borderRadius : rad, padding : pad, '--hover-bg' : hbg, 
        '--btn-cursor' : cursor, '--trans-time' : trans, display : dis}} className={props.btn}>
        {content}
    </button>
    </>
  )
}

export default Props