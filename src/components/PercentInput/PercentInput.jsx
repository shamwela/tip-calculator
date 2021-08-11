import React from 'react'
import PropTypes from 'prop-types'
import styles from './PercentInput.module.sass'

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
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onClick: PropTypes.func.isRequired,
  selectedTipPercent: PropTypes.any,
}
