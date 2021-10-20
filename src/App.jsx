import React, { Component } from 'react'
import CountContainer from './countainer/Count'
import store from './redux/store'

export default class App extends Component {
  render() {
    return (
      <CountContainer store={store}/>
    )
  }
}
