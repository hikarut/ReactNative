/* @flow */

import React from 'react'
import { AppRegistry } from 'react-native'
import Main from './src/components/Main'
import { Provider } from 'react-redux'
import store from './src/store'

/**
 * Provideを使ってreduxとreact連携する
 */
const App = () => {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  )
}

// AppRegistry.registerComponent('test', () => Main)
AppRegistry.registerComponent('test', () => App)
