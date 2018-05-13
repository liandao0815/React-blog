import React, { Component } from 'react'
import { hot } from 'react-hot-loader'
import { Provider } from 'react-redux'
import RouterComponent from './router'
import store from './store'
import './assets/styles/index.scss'

@hot(module)
class App extends Component {
  render() {
    return (
      <Provider store={store} key={Math.random()}>
        <RouterComponent />
      </Provider>
    )
  }
}

export default App
