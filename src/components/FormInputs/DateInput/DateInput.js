import React from 'react'
import moment from 'moment'
import {DatePicker} from 'antd'

const DateInput = ({height, width, minDate, maxDate, isOutlined, onChange, value, ...props}) => {
  const checkForDisable = (e) => {
    const newMax = moment(maxDate, props.picker === 'month' ? 'MM/YYYY' : 'DD/MM/YYYY').add(
      1,
      props.picker === 'month' ? 'months' : 'days',
    )
    if (minDate && maxDate) {
      return e <= moment(minDate, props.picker === 'month' ? 'MM/YYYY' : 'DD/MM/YYYY') || e >= newMax
    }
    if (minDate) {
      return e < moment(minDate, props.picker === 'month' ? 'MM/YYYY' : 'DD/MM/YYYY').endOf()
    }
    if (maxDate) {
      return (
        e &&
        e >=
          moment(maxDate, props.picker === 'month' ? 'MM/YYYY' : 'DD/MM/YYYY').add(
            1,
            props.picker === 'month' ? 'M' : 'd',
          )
      )
    }
    return null
  }

  return (
    <DatePicker
      {...props}
      style={{height, width}}
      disabledDate={checkForDisable}
      className={`main-date-input ${isOutlined ? 'outlined' : ''}`}
      onChange={(_, dateStr) => {
        onChange(dateStr)
      }}
      value={value ? moment(value, props.picker === 'month' ? 'MM/YYYY' : 'DD/MM/YYYY') : ''}
    />
  )
}

export default DateInput
