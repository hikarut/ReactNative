/* @flow */

import React from 'react'
import { AppRegistry } from 'react-native'
import Main from './src/components/Main'
import { Provider } from 'react-redux'
import configureStore from './src/store'

const store = configureStore()

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

AppRegistry.registerComponent('test', () => App)
