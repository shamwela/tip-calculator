import React from 'react'
import PropTypes from 'prop-types'

export default function Input({ name, value, onChange, error }) {
  return (
    <input
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      className={error ? 'input-error' : null}
      placeholder={name === 'customTipPercent' ? 'Custom' : '0'}
      type='tel'
      // use "tel" input instead of "number" because "number" doesn't fire onChange event if the input is wrong
    />
  )
}

Input.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.any.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
}
