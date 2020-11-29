import React from 'react';
import ReactDOM from 'react-dom';
import {CountUp} from 'countup.js';

import './index.css';

class Block extends React.PureComponent {
  render() {
    return (
      <div>
        {this.props.input}
        <input
          id="inputRadix" type="number"
          placeholder={this.props.base}
          readOnly
          min={this.props.base}
          max={this.props.base}
        />
      </div>
    )
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      computedBase10: null,
      invalid: null,
    }
  }

  evaluate(input) {
    if (input === '') return null;

    let numbers = /^[0-1]+$/;
    if (input.match(numbers)) {
      let result = 0;
      for (let i = 0; i < input.length; ++i) {
        result = result * 2 + (Number(input[i]));
      }
      return result;
    } else {
      return 'invalid';
    }
  }

  handleChange(e) {
    let input = e.target.value;
    let val = this.evaluate(input);

    let c = new CountUp('result', 0, {duration: 1, useGrouping: true});

    if (val === 'invalid') {
      this.setState({
        computedBase10: val,
        invalid: val,
      })
    } else {
      c.update(val);

      this.setState({
        computedBase10: val,
        invalid: '',
      })

      if(!c.error)
        c.start();
    }
  }

  render() {
    return (
      <div className="app">
        <div className="header">
          Binary to Decimal
        </div>
        <div className="converter">
          <Block
            input={
              <input id="input"
                type="text"
                className={this.state.invalid}
                placeholder="type a binary"
                onChange={(e) => { this.handleChange(e) }}
                maxLength={32}
                autoFocus />
            }
            base={2}
          />
          <div className="equal">=</div>
          <Block
            input={
              <input id="result"
                type="text"
                className={this.state.invalid}
                value={this.state.computedBase10 === null ? '' : this.state.computedBase10}
                readOnly />
            }
            base={10}
          />
        </div>
      </div>
    )
  }
}

// =====================================

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);