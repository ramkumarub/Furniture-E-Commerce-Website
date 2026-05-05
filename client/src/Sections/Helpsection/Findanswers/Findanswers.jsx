import React, { useState } from 'react'
import findanswers from './findanswers.module.css'

const Findanswers = () => {

  const faqData = [
    {
      question: 'How do I know that my products lorem ipsum dolor sit?',
      answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent dapibus dignissim turpis nec interdum. Nunc faucibus turpis vitae mi rhoncus, sed interdum mi commodo. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In mauris est, sagittis id arcu eu, scelerisque maximus odio.'
    },
    {
      question: 'Where can I see my invoices?',
      answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent dapibus dignissim turpis nec interdum. Nunc faucibus turpis vitae mi rhoncus, sed interdum mi commodo. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In mauris est, sagittis id arcu eu, scelerisque maximus odio.'
    },
    {
      question: 'Can I compare prices between tincidunt dui in congue?',
      answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent dapibus dignissim turpis nec interdum. Nunc faucibus turpis vitae mi rhoncus, sed interdum mi commodo. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In mauris est, sagittis id arcu eu, scelerisque maximus odio.'
    },
    {
      question: 'Are there any surcharges?',
      answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent dapibus dignissim turpis nec interdum. Nunc faucibus turpis vitae mi rhoncus, sed interdum mi commodo. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In mauris est, sagittis id arcu eu, scelerisque maximus odio.'
    },
    {
      question: 'I made an online purchase. Where can I check order status?',
      answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent dapibus dignissim turpis nec interdum. Nunc faucibus turpis vitae mi rhoncus, sed interdum mi commodo. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In mauris est, sagittis id arcu eu, scelerisque maximus odio.'
    },
  ]

  const [active, setActive] = useState(0)

  const toggle = (index) => {
    setActive(active === index ? null : index)
  }

return (
  <>
    <div className={findanswers.container}>
      <h6>FAQ</h6>
      <h1>FIND ANSWERS</h1>
      <span></span>
      <div className={findanswers.main}>
        {faqData.map((item, index) => (
          <div key={index} className={findanswers.faqcontent}>
            <div className={findanswers.faqquestion} onClick={() => toggle(index)}>
              <h2>{item.question}</h2>
              <h5>{active === index ? '-' : '+'}</h5>
            </div>
            {active === index && (
              <div className={findanswers.faqanswer}>
                <p>{item.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  </>
)
}

export default Findanswers