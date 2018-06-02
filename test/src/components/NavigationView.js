/* @flow */

'use strict'

import Detail from '../container/Detail'
import Home from './Home'
import { StackNavigator } from 'react-navigation'

const NavigationView = StackNavigator(
  {
    Home: { screen: Home },
    Detail: { screen: Detail }
  },
  {
    initialRouteName: 'Home'
  }
)

export default NavigationView
