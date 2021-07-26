import React, { useState, useEffect } from 'react'
import PercentInput from './PercentInput'
import '../styles/TipCalculator.sass'

const initialValues = {
  bill: 100,
  tipPercent: 10,
  customTipPercent: '',
  people: 1,
  tipPerPerson: null,
  totalPerPerson: null,
}

export default function TipCalculator() {
  const [
    {
      bill,
      tipPercent,
      customTipPercent,
      people,
      tipPerPerson,
      totalPerPerson,
    },
    setValues,
  ] = useState(initialValues)
  const [errors, setErrors] = useState({})

  const roundToTwoDecimals = (number) => {
    // best accuracy for this calculation
    return Math.round((number + Number.EPSILON) * 100) / 100
  }

  const validate = () => {
    const finalErrors = { ...errors }

    bill <= 0
      ? (finalErrors.bill = ' must be greater than 0')
      : delete finalErrors.bill

    customTipPercent && customTipPercent <= 0
      ? (finalErrors.customTipPercent = ' must be greater than 0')
      : delete finalErrors.customTipPercent

    people <= 0
      ? (finalErrors.people = ' must be greater than 0')
      : delete finalErrors.people

    setErrors(finalErrors)

    // If there are no errors, all inputs are valid
    return Object.keys(finalErrors).length === 0
  }

  const calculate = () => {
    let tipPercentFloat
    if (customTipPercent) {
      tipPercentFloat = customTipPercent / 100
    } else {
      tipPercentFloat = tipPercent / 100
    }
    const totalTip = bill * tipPercentFloat
    const tipPerPerson = roundToTwoDecimals(totalTip / people)

    const total = bill + totalTip
    const totalPerPerson = roundToTwoDecimals(total / people)

    setValues((currentValues) => {
      return { tipPerPerson, totalPerPerson, ...currentValues }
    })
  }

  useEffect(() => {
    if (validate()) calculate()
  }, [bill, tipPercent, customTipPercent, people])

  const handleChange = ({ currentTarget }) => {
    const values = { bill, tipPercent, customTipPercent, people }
    const { name, value } = currentTarget

    values[name] = value

    setValues(values)
  }

  const handleReset = () => {
    setValues({ ...initialValues })
  }

  return (
    <main>
      <img id='logo' src='./logo.svg' alt='Logo' />
      <article id='tip-calculator'>
        <section id='input-section'>
          <section id='bill-section'>
            <label htmlFor='bill'>Bill</label>
            {errors.bill && <span>{errors.bill}</span>}
            <input
              id='bill'
              name='bill'
              value={bill}
              onChange={handleChange}
              type='number'
              min='1'
              required
            />
          </section>
          <section id='select-tip'>
            <label htmlFor='percent-input-section'>Select Tip %</label>
            {errors.customTipPercent && <span>{errors.customTipPercent}</span>}
            <section id='percent-input-section'>
              {[5, 10, 15, 25, 50].map((value) => (
                <PercentInput
                  key={value}
                  value={value}
                  onClick={handleChange}
                />
              ))}
              <input
                name='customTipPercent'
                value={customTipPercent}
                onChange={handleChange}
                type='number'
                placeholder='Custom'
              />
            </section>
          </section>
          <section id='people-section'>
            <label htmlFor='people'>Number of People</label>
            {errors.people && <span>{errors.people}</span>}
            <input
              id='people'
              name='people'
              value={people}
              onChange={handleChange}
              type='number'
              min='1'
              required
            />
          </section>
        </section>
        <section id='output-section'>
          <section className='output'>
            <div>
              Tip Amount
              <br />/ person
            </div>
            <div className='output-value'>${tipPerPerson}</div>
          </section>

          <section className='output'>
            <div>
              Total
              <br />/ person
            </div>
            <div className='output-value'>${totalPerPerson}</div>
          </section>

          <button onClick={handleReset} id='reset-button'>
            RESET
          </button>
        </section>
      </article>
    </main>
  )
}
