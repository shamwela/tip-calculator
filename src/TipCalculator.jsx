import React, { Component } from 'react'
import PercentInput from './PercentInput'
import './TipCalculator.sass'

export default class TipCalculator extends Component {
  render() {
    return (
      <main>
        <img id='logo' src='./logo.svg' alt='Logo' />
        <article id='tip-calculator'>
          <section id='input-section'>
            <section id='bill'>
              <label htmlFor=''>Bill</label>
              <input type='number' min='1' />
            </section>
            <section id='select-tip'>
              <label htmlFor=''>Select Tip %</label>
              <section id='percent-input-section'>
                {[5, 10, 15, 25, 50].map((value) => (
                  <PercentInput value={value} />
                ))}
                <input type='number' placeholder='Custom' />
              </section>
            </section>
            <section id='people'>
              <label htmlFor=''>Number of People</label>
              <input type='number' min='1' />
            </section>
          </section>
          <section id='output-section'>
            <section>
              <div>
                Tip Amount
                <br />/ person
              </div>
              <div>$4.27</div>
            </section>
            <section>
              <div>
                Total
                <br />/ person
              </div>
              <div>$4.27</div>
            </section>
            <button id='reset-button'>RESET</button>
          </section>
        </article>
      </main>
    )
  }
}
