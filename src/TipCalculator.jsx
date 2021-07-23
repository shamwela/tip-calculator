import React, { Component } from 'react'
import PercentInput from './PercentInput'
import './TipCalculator.sass'

export default class TipCalculator extends Component {
  initialState = {
    bill: 100,
    tipPercent: 10,
    people: 2,
  }

  state = { ...this.initialState }

  handleChange = (event) => {
    const state = { ...this.state }
    const { name, value } = event.currentTarget
    state[name] = value

    const { bill, tipPercent, people } = state

    // console.log('tipPercent', tipPercent)
    const tipPercentFloat = tipPercent / 100
    // console.log('tipPercentFloat', tipPercentFloat)
    const tip = bill * tipPercentFloat
    const tipPerPerson = (tip / people).toFixed(2)

    const total = bill + tip
    const totalPerPerson = (total / people).toFixed(2)

    this.setState({ [name]: value, tip: tipPerPerson, total: totalPerPerson })
  }

  handleReset = () => {
    this.setState({ ...this.initialState })
  }

  render() {
    const { handleChange, handleReset } = this
    const { bill, tipPercent, people, tip, total } = this.state

    return (
      <main>
        <img id='logo' src='./logo.svg' alt='Logo' />
        <article id='tip-calculator'>
          <section id='input-section'>
            <section id='bill'>
              <label htmlFor=''>Bill</label>
              <input
                value={bill}
                name='bill'
                onChange={handleChange}
                type='number'
                min='1'
              />
            </section>
            <section id='select-tip'>
              <label htmlFor=''>Select Tip %</label>
              <section id='percent-input-section'>
                {[5, 10, 15, 25, 50].map((value) => (
                  <PercentInput
                    key={value}
                    value={value}
                    onClick={handleChange}
                  />
                ))}
                <input
                  value={tipPercent}
                  name='tipPercent'
                  onChange={handleChange}
                  type='number'
                  placeholder='Custom'
                />
              </section>
            </section>
            <section id='people'>
              <label htmlFor=''>Number of People</label>
              <input
                value={people}
                name='people'
                onChange={handleChange}
                type='number'
                min='1'
              />
            </section>
          </section>
          <section id='output-section'>
            <section className='output'>
              <div>
                Tip Amount
                <br />/ person
              </div>
              <div className='output-value'>${tip}</div>
            </section>

            <section className='output'>
              <div>
                Total
                <br />/ person
              </div>
              <div className='output-value'>${total}</div>
            </section>

            <button onClick={handleReset} id='reset-button'>
              RESET
            </button>
          </section>
        </article>
      </main>
    )
  }
}
