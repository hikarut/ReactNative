/* @flow */

'use strict'

import React, { Component } from 'react'
import {
  View,
  Text,
  WebView,
  StyleSheet,
  Dimensions,
  TouchableHighlight
} from 'react-native'
import Loading from './Loading'

console.log('Detail.js')
const { width, height } = Dimensions.get('window')

// 型の定義
type State = {
  loading: boolean,
  url: string
}

// 型の定義
type Props = {
  navigation: Object,
  children?: Element
}

export default class Detail extends Component<Props, State> {
  state: State
  props: Props
  webview: WebView

  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.title
  })

  constructor() {
    super()
    // 初期化
    this.state = {
      loading: false
    }
  }

  // 初期処理
  componentWillMount() {}

  // ローディング画面
  renderLoading() {
    return <Loading />
  }

  goBack(): void {
    /*
    // stateの変更サンプル
    this.setState({
      loading: false,
      url: 'https://www.yahoo.co.jp/'
    })
    */
    this.webview.goBack()
  }

  goForward(): void {
    this.webview.goForward()
  }

  onNavigationStateChange(status: Object): void {
    // 戻る、進ができるか状態が見れる
    console.log('onNavigationStateChange')
    console.log(status)
  }

  onLoad(status: Object): void {
    console.log('onLoad')
    console.log(status)
    this.setState({
      loading: false
    })
  }

  onLoadStart(status: Object): void {
    console.log('onLoadStart')
    console.log(status)
    this.setState({
      loading: true
    })
  }

  render() {
    const { params } = this.props.navigation.state
    console.log('params')
    console.log(params)

    let loading = null
    if (this.state.loading) {
      loading = (
        <View style={styles.overlay}>
          <Loading />
        </View>
      )
    }

    return (
      <View style={styles.main}>
        <WebView
          ref={webview => {
            this.webview = webview
          }}
          source={{ uri: params.url }}
          style={styles.view}
          javaScriptEnabled={true}
          onNavigationStateChange={this.onNavigationStateChange.bind(this)}
          onLoad={this.onLoad.bind(this)}
          onLoadStart={this.onLoadStart.bind(this)}
        />
        <View style={styles.footerMenu}>
          <TouchableHighlight onPress={this.goBack.bind(this)}>
            <Text>戻る</Text>
          </TouchableHighlight>
          <TouchableHighlight onPress={this.goForward.bind(this)}>
            <Text>進む</Text>
          </TouchableHighlight>
        </View>
        {loading}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    flexDirection: 'column'
  },
  view: {
    marginBottom: 0
  },
  footerMenu: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  overlay: {
    flex: 1,
    position: 'absolute',
    left: width / 3,
    right: width / 3,
    top: height / 3,
    bottom: height / 3,
    margin: 0,
    opacity: 1.0
  }
})
