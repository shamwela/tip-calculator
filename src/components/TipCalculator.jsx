import React, { useState, useEffect } from 'react'
import PercentInput from './PercentInput'
import Error from './Error'
import '../styles/TipCalculator.sass'
import Input from './Input'

const initialValues = {
  bill: 100,
  tipPercent: undefined,
  customTipPercent: undefined,
  people: 1,
  tipPerPerson: undefined,
  totalPerPerson: undefined,
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
    const inputsToValidate = { bill, customTipPercent, people }

    for (const [key, value] of Object.entries(inputsToValidate)) {
      if (value <= 0) {
        finalErrors[key] = ' should be a positive number'
      } else {
        delete finalErrors[key]
      }
    }
    // If the number of people is not an integer
    if (people !== '' && !Number.isInteger(people)) {
      finalErrors.people = ' should be a positive integer'
    }

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

    if (tipPerPerson && totalPerPerson) {
      setValues((previousValues) => {
        return { tipPerPerson, totalPerPerson, ...previousValues }
      })
    }
  }

  useEffect(() => {
    if (validate()) calculate()
  }, [bill, tipPercent, customTipPercent, people])

  const handleChange = ({ currentTarget }) => {
    const values = { bill, tipPercent, customTipPercent, people }
    const { name, value } = currentTarget
    const finalValue = value === '' ? '' : Number(value)

    values[name] = finalValue

    setValues(values)
  }

  const handleReset = () => {
    setValues({ ...initialValues })
  }

  const areInputsEmpty = () => {
    const inputs = [bill, tipPercent, customTipPercent, people]
    return inputs.every((input) => (input ? false : true))
  }

  return (
    <main>
      <article id='container'>
        <section id='logo-section'>
          <img id='logo' src='./logo.svg' alt='Logo' />
        </section>
        <section id='tip-calculator'>
          <section id='input-section'>
            <section id='bill-section'>
              <label htmlFor='bill'>Bill</label>
              {errors.bill && <Error message={errors.bill} />}
              <Input
                name='bill'
                value={bill}
                onChange={handleChange}
                error={errors.bill}
              />
            </section>
            <section id='select-tip'>
              <label htmlFor='percent-input-section'>Tip %</label>
              {errors.customTipPercent && (
                <Error message={errors.customTipPercent} />
              )}
              <section id='percent-input-section'>
                {[5, 10, 15, 25, 50].map((value) => (
                  <PercentInput
                    key={value}
                    value={value}
                    onClick={handleChange}
                    selectedTipPercent={tipPercent}
                  />
                ))}
                <Input
                  name='customTipPercent'
                  value={customTipPercent}
                  onChange={handleChange}
                  error={errors.customTipPercent}
                />
              </section>
            </section>
            <section id='people-section'>
              <label htmlFor='people'>Number of People</label>
              {errors.people && <Error message={errors.people} />}
              <Input
                name='people'
                value={people}
                onChange={handleChange}
                error={errors.people}
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
            <button
              onClick={handleReset}
              disabled={areInputsEmpty()}
              id='reset-button'
            >
              RESET
            </button>
          </section>
        </section>
      </article>
    </main>
  )
}
