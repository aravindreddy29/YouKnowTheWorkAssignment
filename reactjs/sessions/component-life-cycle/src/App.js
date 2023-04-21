/* eslint-disable prettier/prettier */
/* eslint-disable lines-between-class-members */
/* eslint-disable react/no-unused-state */
import {Component} from 'react'
import './App.css'
import Clock from './components/Clock'

class App extends Component {
  state = {
    showClock: false,
  }
  onToggleClock = () => {
    this.setState(prevState => {
      const {showClock} = prevState
      return {
        showClock: !showClock,
      }
    })
  }
  render() {
    const {showClock} = this.state
    return (
      <div className="app-container">
        <button
          type="button"
          className="toggle-button"
          onClick={this.onToggleClock}
        >
          {showClock ? 'Hide Clock' : 'Show Clock'}
        </button>
        {showClock && <Clock />}
      </div>
    )
  }
}

export default App
