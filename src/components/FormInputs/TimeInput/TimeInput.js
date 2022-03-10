import React from 'react'
import {TimePicker} from 'antd'
import moment from 'moment'

const TimeInput = ({value, onChange, height, ...props}) => {
  const format = 'HH:mm'

  const handleTimeChange = (time, timeString) => {
    onChange(timeString)
  }

  return (
    <TimePicker
      style={{height}}
      className="main-timeinput"
      onChange={handleTimeChange}
      value={value ? moment(value, format) : ''}
      suffixIcon={<i className="fa-light fa-clock-three" />}
      format={format}
      {...props}
    />
  )
}

export default TimeInput
