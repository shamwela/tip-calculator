import React from 'react'
import PropTypes from 'prop-types'
import styles from '../styles/PercentInput.module.sass'

export default function PercentInput({ value, onClick, selectedTipPercent }) {
  return (
    <button
      name={'tipPercent'}
      value={value}
      onClick={onClick}
      className={selectedTipPercent === value ? styles.selected : null}
    >
      {value}%
    </button>
  )
}

PercentInput.propTypes = {
  value: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
}
