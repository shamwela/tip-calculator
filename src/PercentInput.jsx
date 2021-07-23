import React, { Component } from 'react'

export default class PercentInput extends Component {
  render() {
    const { value, onClick } = this.props

    return (
      <button name={'tipPercent'} value={value} onClick={onClick}>
        {value}%
      </button>
    )
  }
}
