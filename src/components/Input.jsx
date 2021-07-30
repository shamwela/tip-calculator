import React from 'react'

export default function Input({ name, value, onChange, error }) {
  return (
    <input
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      className={error ? 'input-error' : null}
      placeholder={name === 'customTipPercent' ? 'Custom' : '0'}
      type='number'
      min='0'
    />
  )
}
