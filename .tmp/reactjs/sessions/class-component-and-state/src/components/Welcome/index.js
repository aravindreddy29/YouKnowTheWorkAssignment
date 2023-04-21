import {Component} from 'react'

const Welcome extends Component{
render(){
    const {name} = props
    return <h1>Hello, {name}</h1>
  }
}

export default Welcome
