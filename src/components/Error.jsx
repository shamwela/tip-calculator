import React from 'react'
import styles from '../styles/Error.module.sass'

export default function Error({ message }) {
  return <span className={styles.error}>{message}</span>
}
