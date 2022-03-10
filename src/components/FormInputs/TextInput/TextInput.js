import React from 'react'
import {Input} from 'antd'

// CSS
import '../FormStyle.css'

const TextInput = ({height, outlined, disabled, type, ...props}) => {
  const text = (
    <Input
      className={`main-input ${outlined ? 'outlined-input' : null} ${disabled ? 'input-disabled' : null}`}
      {...props}
      disabled={disabled}
      style={{height}}
    />
  )

  const password = (
    <Input.Password
      className={`main-input ${outlined ? 'outlined-input' : null} ${disabled ? 'input-disabled' : null}`}
      {...props}
      disabled={disabled}
      style={{height}}
      autoComplete="off"
    />
  )

  const textarea = (
    <Input.TextArea
      className={`main-input ${outlined ? 'outlined-input' : null} ${disabled ? 'input-disabled' : null}`}
      {...props}
      disabled={disabled}
      style={{height}}
    />
  )

  function typeCheck(type) {
    switch (type) {
      case 'password':
        return password
      case 'email':
      case 'text':
        return text
      case 'textarea':
        return textarea
      default:
        return text
    }
  }

  return typeCheck(type)
}

export default TextInput
