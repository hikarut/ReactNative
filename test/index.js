/* @flow */

import React from 'react'
import { AppRegistry } from 'react-native'
// import Main from './src/components/Main'
import ReduxSample from './src/components/ReduxSample'
import { Provider } from 'react-redux'
import configureStore from './src/store'

const store = configureStore()

console.log('------store.getState()-------')
console.log(store.getState())

/**
 * Provideを使ってreduxとreact連携する
 */
const App = () => {
  return (
    <Provider store={store}>
      <ReduxSample />
    </Provider>
  )
}

// AppRegistry.registerComponent('test', () => Main)
AppRegistry.registerComponent('test', () => App)
