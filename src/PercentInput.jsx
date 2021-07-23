import React, { Component } from 'react'

export default class PercentInput extends Component {
  render() {
    const { value } = this.props
    return <button>{value}%</button>
  }
}
