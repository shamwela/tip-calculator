import React from 'react'

export default function PercentInput({ value, onClick }) {
  return (
    <button name={'tipPercent'} value={value} onClick={onClick}>
      {value}%
    </button>
  )
}
