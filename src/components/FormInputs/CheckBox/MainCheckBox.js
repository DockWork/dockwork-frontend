import React from 'react'
import {Checkbox} from 'antd'

// CSS
import '../FormStyle.css'

const MainCheckBox = ({checkLabel, ...props}) => {
  return (
    <Checkbox {...props} className="main-checkbox">
      {checkLabel}
    </Checkbox>
  )
}

export default MainCheckBox
