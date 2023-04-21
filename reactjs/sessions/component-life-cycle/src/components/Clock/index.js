/* eslint-disable react/sort-comp */
/* eslint-disable lines-between-class-members */
import {Component} from 'react'
import './index.css'

class Clock extends Component {
  constructor(props) {
    super(props)
    this.state = {date: new Date()}
  }
  componentDidMount() {
    this.timerID = setInterval(this.tick, 1000)
  }
  tick = () => {
    this.setState({date: new Date()})
  }
  componentWillUnmount() {
    clearInterval(this.timerID)
  }
  render() {
    const {date} = this.state
    console.log(date)
    return (
      <div className="clock-container">
        <h1 className="heading">Clock</h1>
        <p className="time">{date.toLocaleTimeString()}</p>
      </div>
    )
  }
}

export default Clock
