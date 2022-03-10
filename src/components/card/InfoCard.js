import React from 'react'

import './card.css'

const InfoCard = ({children, title, description, width, height}) => {
  return (
    <div className="main-card" style={{width, height}}>
      <div>
        <div className="main-card-title">{title}</div>
        <div className="main-card-descrition">{description}</div>
      </div>
      {children}
    </div>
  )
}

export default InfoCard
