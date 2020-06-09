import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      counter: 0,
      error: false
    };
  }

  incrementCounter = () => {
    this.setState({error: false});
    let { counter } = this.state;
    this.setState({counter: counter + 1});
  }

  decrementCounter = () => {
    let { counter } = this.state;
    if (counter === 0) {
      this.setState({error: true});
    } else {
      this.setState({counter: counter - 1});
    } 
  }

  render() {
    let { counter, error }  = this.state;
    return (
      <div data-test="component-app">
        <h1 data-test="counter-display">The counter is currently {counter}</h1>
        {error && (<h2 data-test="counter-display-error" className="error">The counter cannot go below 0</h2>)} 
        <button
          data-test="increment-button"
          onClick={() => this.incrementCounter()}
        >
        Increment counter
        </button>

        <button
          data-test="decrement-button"
          onClick={() => this.decrementCounter()}
        >
        Decrement counter
        </button>
      </div>
    );
  } 
}

export default App;
