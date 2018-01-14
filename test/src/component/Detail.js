/* @flow */

'use strict'

import React, { Component } from 'react'
import { WebView, StyleSheet } from 'react-native'

console.log('Detail.js')

// 型の定義
type State = {
  loaded: boolean
}

// 型の定義
type Props = {
  navigation: Object
}

export default class Detail extends Component<Props, State> {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.title
  })

  constructor() {
    super()
    // 初期化
    this.state = {
      loaded: false
    }
  }

  render() {
    const { params } = this.props.navigation.state
    console.log(params)

    return <WebView source={{ uri: params.url }} style={styles.view} />
  }
}

const styles = StyleSheet.create({
  view: {
    marginBottom: 40
  }
})
