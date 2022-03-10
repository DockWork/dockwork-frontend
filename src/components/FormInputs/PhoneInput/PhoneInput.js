import React, {useEffect, useState} from 'react'
import SelectInput from '../SelectInput/SelectInput'
import TextInput from '../TextInput/TextInput'
import {AsYouType, getCountryCallingCode, isPossiblePhoneNumber, parsePhoneNumber} from 'libphonenumber-js'
import {countriesCodeName} from '../../../utils/countries'

function PhoneInput({
  height,
  outlined,
  disabled,
  onChange,
  phoneCountry,
  setSelectedCountry,
  selectedCountry,
  value,
  ...props
}) {
  const [initialValue, setInitialValue] = useState(value)
  const countryCodesNames = countriesCodeName()
  const options = []
  for (let i = 0; i < countryCodesNames.length; i++) {
    const zone = countryCodesNames[i]
    options.push({
      value: zone.value,
      label: (
        <>
          <img
            src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${zone.value}.svg`}
            alt={zone.value}
            width="14px"
            style={{marginRight: 4}}
          />
          +{getCountryCallingCode(zone.value)} {zone.label}
        </>
      ),
    })
  }
  const handleFormating = (value) => {
    let result = new AsYouType(selectedCountry).input(value)
    if (isPossiblePhoneNumber(value)) {
      const numberParsed = parsePhoneNumber(value)
      if (numberParsed) {
        let countryCode = numberParsed.country
        if (countryCode) {
          setSelectedCountry(countryCode)
        }
      }
    }

    onChange({target: {value: result}})
  }
  useEffect(() => {
    if (initialValue) {
      handleFormating(initialValue)
    } else {
      onChange({target: {value: ''}})
    }
  }, [initialValue, selectedCountry])
  useEffect(() => {
    if (!selectedCountry && phoneCountry) {
      setSelectedCountry(String(phoneCountry).toUpperCase())
    }
  }, [phoneCountry])
  return (
    <div style={{display: 'flex', height: height}}>
      <div style={{width: '30%'}}>
        <SelectInput
          selectType={outlined ? 'isOutlined' : ''}
          disabled={disabled}
          value={selectedCountry}
          isPhoneSelect={true}
          onChange={(e) => setSelectedCountry(e)}
          selectOptions={options}
        />
      </div>
      <div style={{width: '70%'}}>
        <TextInput
          {...props}
          value={value || initialValue}
          onChange={(e) => setInitialValue(e.target.value)}
          outlined={outlined}
          disabled={disabled}
        />
      </div>
    </div>
  )
}

export default PhoneInput
