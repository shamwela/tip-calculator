import React, { useState, useEffect } from 'react'
import PercentInput from './PercentInput'
import './TipCalculator.sass'

const initialState = {
  bill: 100,
  tipPercent: 10,
  people: 1,
  tip: 10,
  total: 110,
}

export default function TipCalculator() {
  let [{ bill, tipPercent, people, tip, total }, setState] =
    useState(initialState)

  const calculate = (state) => {
    const { bill, tipPercent, people } = state

    const tipPercentFloat = tipPercent / 100
    const tip = bill * tipPercentFloat
    const tipPerPerson = (tip / people).toFixed(2)

    const total = bill + tip
    const totalPerPerson = (total / people).toFixed(2)

    setState({
      ...state,
      tip: tipPerPerson,
      total: totalPerPerson,
    })
  }

  const handleChange = ({ currentTarget }) => {
    let state = { bill, tipPercent, people }
    const { name, value } = currentTarget
    state[name] = value
    calculate(state)
  }

  const handleReset = () => {
    setState({ ...initialState })
  }

  return (
    <main>
      <img id='logo' src='./logo.svg' alt='Logo' />
      <article id='tip-calculator'>
        <section id='input-section'>
          <section id='bill-section'>
            <label htmlFor='bill'>Bill</label>
            <input
              id='bill'
              name='bill'
              value={bill}
              onChange={handleChange}
              type='number'
              min='1'
            />
          </section>
          <section id='select-tip'>
            <label htmlFor='percent-input-section'>Select Tip %</label>
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
          <section id='people-section'>
            <label htmlFor='people'>Number of People</label>
            <input
              id='people'
              name='people'
              value={people}
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
