import React, { useState, useEffect } from 'react'
import PercentInput from './PercentInput'
import '../styles/TipCalculator.sass'

const initialValues = {
  bill: 100,
  tipPercent: 10,
  customTipPercent: '',
  people: 1,
  tip: 10,
  total: 110,
}

export default function TipCalculator() {
  const [
    { bill, tipPercent, customTipPercent, people, tip, total },
    setValues,
  ] = useState(initialValues)
  const [errors, setErrors] = useState({})

  const validate = ({ bill, customTipPercent, people }) => {
    setErrors((errors) => {
      bill <= 0
        ? (errors.bill = 'Bill must be greater than 0')
        : delete errors[bill]

      customTipPercent && customTipPercent <= 0
        ? (errors.customTipPercent =
            'Custom tip percent must be greater than 0')
        : delete errors[customTipPercent]

      people <= 0
        ? (errors.people = 'Number of people must be greater than 0')
        : delete errors[people]

      return errors
    })

    // If there are no errors, all inputs are valid
    return Object.keys(errors).length === 0
  }

  useEffect(() => {
    if (validate({ bill, customTipPercent, people })) {
      calculate({ bill, tipPercent, customTipPercent, people })
    }
  }, [bill, tipPercent, customTipPercent, people])

  const calculate = (values) => {
    const { bill, tipPercent, customTipPercent, people } = values

    let tipPercentFloat
    if (customTipPercent) {
      tipPercentFloat = customTipPercent / 100
    } else {
      tipPercentFloat = tipPercent / 100
    }
    console.log('tipPercentFloat', tipPercentFloat)
    const tip = bill * tipPercentFloat
    console.log('tip', tip)
    const tipPerPerson = (tip / people).toFixed(2)
    console.log('tipPerPerson', tipPerPerson)

    const total = bill + tip
    const totalPerPerson = (total / people).toFixed(2)

    setValues((currentValues) => {
      return { tip: tipPerPerson, total: totalPerPerson, ...currentValues }
    })
  }

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
            {errors.bill && <p>{errors.bill}</p>}
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
            {errors.customTipPercent && <p>{errors.customTipPercent}</p>}
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
            {errors.people && <p>{errors.people}</p>}
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
