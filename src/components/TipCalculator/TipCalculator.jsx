import React, { useState, useEffect } from 'react'
import Error from '../Error/Error'
import Input from '../Input/Input'
import PercentInput from '../PercentInput/PercentInput'
import './TipCalculator.sass'
import logo from '../../assets/logo.svg'
import dollar from '../../assets/dollar.svg'
import person from '../../assets/person.svg'

const initialValues = {
  bill: '',
  tipPercent: undefined,
  customTipPercent: '',
  people: '',
  tipPerPerson: 0,
  totalPerPerson: 0,
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

  useEffect(() => {
    const validate = () => {
      setErrors((previousErrors) => {
        const finalErrors = { ...previousErrors }
        const inputsToValidate = { bill, customTipPercent, people } // These inputs will be strings

        for (const [key, value] of Object.entries(inputsToValidate)) {
          if (/[^0-9.]/g.test(Number(value))) {
            finalErrors[key] = ' should be a positive number'
          } else {
            delete finalErrors[key]
          }
        }

        // If the number of people is not an integer
        if (people !== '' && !Number.isInteger(Number(people))) {
          finalErrors.people = ' should be a positive integer'
        }

        return finalErrors
      })
    }

    const calculate = () => {
      // State values are string, so they should be converted to numbers

      let tipPercentFloat
      if (customTipPercent) {
        tipPercentFloat = Number(customTipPercent) / 100
      } else {
        tipPercentFloat = Number(tipPercent) / 100
      }
      const totalTip = Number(bill) * tipPercentFloat
      const tipPerPerson = roundToTwoDecimals(totalTip / people)

      const total = Number(bill) + totalTip
      const totalPerPerson = roundToTwoDecimals(total / people)

      setValues((previousValues) => {
        return { tipPerPerson, totalPerPerson, ...previousValues }
      })
    }

    validate()
    // If 3 inputs are present and they have no errors
    if (
      bill &&
      (tipPercent || customTipPercent) &&
      people &&
      Object.keys(errors).length === 0
    ) {
      calculate()
    }
  }, [bill, tipPercent, customTipPercent, people])

  const allowOnlyPositiveNumber = (value) => {
    let finalValue

    // If the value is a single zero (0), remove it
    if (Number(value) === 0) {
      finalValue = ''
    } else {
      // Allow only number characters and the dot character (.)
      finalValue = value.replaceAll(/[^0-9.]/g, '')
      // Should be stored as a string to accept the dot character (.)
      // e.g. "1." should be stored as just that
    }

    return finalValue
  }

  const handleChange = ({ currentTarget }) => {
    const values = { bill, tipPercent, customTipPercent, people }
    const { name, value } = currentTarget
    values[name] = allowOnlyPositiveNumber(value)

    // tipPercent and customTipPercent both should not exist at the same time
    if (name === 'tipPercent') {
      values.customTipPercent = ''
    }
    if (name === 'customTipPercent') {
      values.tipPercent = ''
    }

    setValues(values)
  }

  const handleReset = () => {
    setValues({ ...initialValues })
  }

  const areInitialValues = () => {
    const inputs = [bill, tipPercent, customTipPercent, people]
    return inputs.every((input) => input === '' || input === undefined)
  }

  return (
    <main>
      <article id='container'>
        <section id='logo-section'>
          <img id='logo' src={logo} alt='Logo' width='85' height='55' />
        </section>
        <section id='tip-calculator'>
          <section id='input-section'>
            <section id='bill-section'>
              <label htmlFor='bill'>Bill</label>
              {errors.bill && <Error message={errors.bill} />}
              <div className='input-wrapper'>
                <Input
                  name='bill'
                  value={bill}
                  onChange={handleChange}
                  error={errors.bill}
                />
                <img className='icon' src={dollar} alt='Dollar icon' />
              </div>
            </section>
            <section id='tip-section'>
              <label htmlFor='percent-tip-section'>Tip %</label>
              {errors.customTipPercent && (
                <Error message={errors.customTipPercent} />
              )}
              <section id='percent-tip-section'>
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
              <div className='input-wrapper'>
                <Input
                  name='people'
                  value={people}
                  onChange={handleChange}
                  error={errors.people}
                />
                <img className='icon' src={person} alt='Person icon' />
              </div>
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
              disabled={areInitialValues()}
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
