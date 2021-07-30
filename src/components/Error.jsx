import React from 'react'
import PropTypes from 'prop-types'
import styles from '../styles/Error.module.sass'

export default function Error({ message }) {
  return <span className={styles.error}>{message}</span>
}

Error.propTypes = {
  message: PropTypes.string.isRequired,
}
