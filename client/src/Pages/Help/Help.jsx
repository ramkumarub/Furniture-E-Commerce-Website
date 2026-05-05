import React from 'react'
import Readytohelp from '../../Sections/Helpsection/Readytohelp/Readytohelp'
import Stillneedhelp from '../../Sections/Helpsection/Stillneedhelp/Stillneedhelp'
import Findanswers from '../../Sections/Helpsection/Findanswers/Findanswers'

const Help = () => {
  return (
    <>
      <Readytohelp />
      <Findanswers />
      <Stillneedhelp />
    </>
  )
}

export default Help