import React from 'react'
import PropTypes from 'prop-types'

export default function PercentInput({ value, onClick }) {
  return (
    <button name={'tipPercent'} value={value} onClick={onClick}>
      {value}%
    </button>
  )
}

PercentInput.propTypes = {
  value: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
}
