/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react'
import { NavigatorIOS } from 'react-native'
import Main from './component/Main'

export default class NavigatorIOSApp extends Component<{}> {
  render() {
    return (
      <NavigatorIOS
        initialRoute={{
          component: Main,
          title: 'NavigatorIOSApp'
        }}
        style={{ flex: 1 }}
      />
    )
  }
}
