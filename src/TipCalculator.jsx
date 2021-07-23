import React, { Component } from 'react'
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
              <input type='number' />
            </section>
            <section id='select-tip'>
              <label htmlFor=''>Select Tip %</label>
              {/* 6 buttons will be here */}
            </section>
            <section id='people'>
              <label htmlFor=''>Number of People</label>
              <input type='number' />
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
            <button>RESET</button>
          </section>
        </article>
      </main>
    )
  }
}
