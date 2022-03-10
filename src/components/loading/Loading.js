import React from 'react'

import './Loading.scss'

function Loading() {
  return (
    <div className="loading-container">
      <div className="spinner spinner-1"></div>
      <h3 style={{fontSize: '25px', color: 'var(--orange)', fontWeight: 'bold'}}>LOADING...</h3>
    </div>
  )
}

export default Loading
