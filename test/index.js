/* @flow */

import React from 'react'
import { AppRegistry } from 'react-native'
import Main from './src/components/Main'
import { Provider } from 'react-redux'
import configureStore from './src/store'
import { YellowBox } from 'react-native'

// Warningの無視
YellowBox.ignoreWarnings([
  'Warning: isMounted(...) is deprecated',
  'Module RCTImageLoader'
])

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
