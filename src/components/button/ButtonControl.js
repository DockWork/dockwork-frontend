import React from 'react'
import {connect} from 'react-redux'
import {Button} from 'antd'

import './button.css'

export const ButtonController = ({
  width,
  height,
  value,
  handleClick,
  type,
  isLoading,
  isDisabled,
  htmlType,
  buttonIcon,
}) => {
  return (
    <div>
      <Button
        className={`main-btn`}
        onClick={handleClick}
        style={{width: width, height: height}}
        disabled={isDisabled}
        loading={isLoading}
        htmlType={htmlType}
        icon={buttonIcon}
        type={type}
      >
        {value}
      </Button>
    </div>
  )
}

const mapStateToProps = () => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(ButtonController)
