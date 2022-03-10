import React from 'react'
import {Form} from 'antd'
import InputText from './TextInput/TextInput'
import SelectMain from './SelectInput/SelectInput'
import DateInput from './DateInput/DateInput'
import MainCheckBox from './CheckBox/MainCheckBox'
import MainTimeInput from './TimeInput/TimeInput'
import PhoneInputField from './PhoneInput/PhoneInput'

import './FormStyle.css'

const FormItem = Form.Item

const CreateAntField =
  (InputComponent) =>
  ({
    field,
    form,
    hasFeedback,
    label,
    submitCount,
    readOnly,
    hasCol,
    suffix,
    arrayTouched = false,
    arrayError = false,
    ...props
  }) => {
    const touched = form.touched[field.name] || arrayTouched
    const submitted = submitCount > 0
    const hasError = form.errors[field.name] || arrayError
    const submittedError = hasError && submitted
    const touchedError = hasError && touched
    const onInputChange = ({target: {value}}) => form.setFieldValue(field.name, value)
    const onChange = (value) => form.setFieldValue(field.name, value)
    const onBlur = () => form.setFieldTouched(field.name, true)
    const onCheckChange = ({target: {value}}) => {
      form.setFieldValue(field.name, !value)
    }
    return (
      <div className="field-container">
        <FormItem
          label={label}
          className={`main-form-item ${props.disabled ? 'is-disabled' : null} ${readOnly ? 'is-readonly' : null}`}
          hasFeedback={(hasFeedback && submitted) || (hasFeedback && touched) ? true : false}
          help={submittedError || touchedError ? hasError : false}
          validateStatus={submittedError || touchedError ? 'error' : 'success'}
          extra={props.extra}
          colon={hasCol || false}
        >
          {!readOnly ? (
            <InputComponent
              {...field}
              suffix={suffix}
              onBlur={onBlur}
              onChange={props.type === 'checkbox' ? onCheckChange : props.type ? onInputChange : onChange}
              {...props}
            ></InputComponent>
          ) : (
            <div className="readonly-input" style={{height: props.height}}>
              {field.value} {suffix}
            </div>
          )}
        </FormItem>
      </div>
    )
  }

export const SelectInput = CreateAntField(SelectMain)
export const DatePickerInput = CreateAntField(DateInput)
export const TextInput = CreateAntField(InputText)
export const Checkbox = CreateAntField(MainCheckBox)
export const TimePickerInput = CreateAntField(MainTimeInput)
export const PhoneInput = CreateAntField(PhoneInputField)
