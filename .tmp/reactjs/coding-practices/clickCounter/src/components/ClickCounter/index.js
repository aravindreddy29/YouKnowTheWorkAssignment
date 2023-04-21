// Write your code here
import {Component} from 'react'
import './index.css'

class ClickCounter extends Component {
  state = {count: 0}

  onIncrement = () => {
    this.setState(prevState => ({count: prevState.count + 1}))
  }

  render() {
    const {count} = this.state
    return (
      <div className="container">
        <h1 className="heading">
          The button has been clicked
          <br /> <span className="counter">{count}</span> times
        </h1>
        <p className="description">Click the button to increase the count!</p>
        <div className="button-container">
          <button type="button" className="button" onClick={this.onIncrement}>
            click Me!
          </button>
        </div>
      </div>
    )
  }
}

export default ClickCounter
