import React from 'react'
import {Select} from 'antd'

const {Option} = Select

// CSS
import '../FormStyle.css'

const SelectInput = ({
  defaultValue,
  selectOptions,
  height,
  width,
  disabled,
  placeholder,
  mode,
  onChange,
  onBlur,
  stylee,
  name,
  isLoading,
  value,
  isPhoneSelect,
  ...props
}) => {
  return (
    <Select
      defaultValue={defaultValue}
      mode={mode}
      loading={isLoading}
      className={`main-select-input`}
      style={{height: height, width: width, ...stylee}}
      disabled={disabled}
      placeholder={placeholder}
      onChange={onChange}
      onBlur={onBlur}
      name={name}
      filterOption={(input, option) => {
        if (!isPhoneSelect) {
          return option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        } else {
          return option.children?.props?.children[4]?.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      }}
      value={value ? value : null}
      {...props}
    >
      {selectOptions?.map((option, index) => (
        <Option key={`opt-${index}`} value={option.value} className="main-selectOption">
          {option.label}
        </Option>
      ))}
    </Select>
  )
}

export default SelectInput
