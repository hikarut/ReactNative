/* @flow */

'use strict'

import React, { Component } from 'react'
import { Platform, StyleSheet, Text, View } from 'react-native'
import ImageSample from './ImageSample'
// import type { Threads } from '../types'

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu'
})

const qiitaUrl = 'https://qiita.com/api/v2/tags/reactjs/items'
console.log(qiitaUrl)

type State = {
  // threads: Array<Threads>
  // threads: Array<Object>
  threads: Object,
  loaded: boolean
}

export default class Main extends Component<void, State> {
  state: State

  constructor() {
    super()
    this.state = { threads: {}, loaded: false }
  }

  // 初期処理
  componentWillMount() {
    console.log('componentWillMount')
    this.fetchData()

    // fetchDataが非同期なのでこのタイミングではthreadsは空
    const threads = this.state
    console.log(threads)
  }

  // API呼び出し
  fetchData(): void {
    console.log('fetchData')
    fetch(qiitaUrl)
      .then(response => response.json())
      .then(responseData => {
        this.setState({
          threads: responseData,
          loaded: true
        })
        console.log('responseData')
        console.log(responseData)
      })
      .done()
  }

  // ローディング画面
  renderLoadingView() {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    )
  }

  render() {
    if (!this.state.loaded) {
      return this.renderLoadingView()
    }

    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native!</Text>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
        <Text style={styles.instructions}>{instructions}</Text>
        <ImageSample />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  }
})
