import React from 'react'
import ButtonControl from '../button/ButtonControl'
import {useHistory} from 'react-router-dom'

import './card.css'

const Card = ({width, height, title, description, link, buttonValue}) => {
  const history = useHistory()

  return (
    <div className="main-card" style={{width, height}} onClick={() => history.push(link)}>
      <div>
        <div className="main-card-title">{title}</div>
        <div className="main-card-descrition">{description}</div>
      </div>
      <ButtonControl
        width={'max-content'}
        value={buttonValue}
        height={'40px'}
        type="primary"
        htmlType="button"
        isLoading={false}
        handleClick={() => history.push(link)}
      />
    </div>
  )
}

export default Card
