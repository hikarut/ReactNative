/* @flow */

'use strict'

import React, { Component } from 'react'
import { WebView } from 'react-native'

console.log('Detail.js')

// 型の定義
type Props = {
  navigation: Object
}

export default class Detail extends Component<Props> {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.title
  })

  render() {
    const { params } = this.props.navigation.state
    console.log(params)

    return <WebView source={{ uri: params.url }} />
  }
}
