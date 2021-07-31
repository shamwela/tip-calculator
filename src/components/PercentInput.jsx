import React from 'react'
import PropTypes from 'prop-types'
import styles from '../styles/PercentInput.module.sass'

export default function PercentInput({ value, onClick, selectedTipPercent }) {
  return (
    <button
      name={'tipPercent'}
      value={value}
      onClick={onClick}
      className={Number(selectedTipPercent) === value ? styles.selected : null}
    >
      {value}%
    </button>
  )
}

PercentInput.propTypes = {
  value: PropTypes.any.isRequired,
  onClick: PropTypes.func.isRequired,
  selectedTipPercent: PropTypes.any,
}
