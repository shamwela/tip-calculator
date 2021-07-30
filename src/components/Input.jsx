import React from 'react'

export default function Input({ name, value, onChange, error }) {
  return (
    <input
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      className={error ? 'input-error' : ''}
      type='number'
      pattern='^[+]?([.]\d+|\d+[.]?\d*)$' // only positive numbers
      min='1'
    />
  )
}
