/* @flow */

'use strict'

import React, { Component } from 'react'
import {
  View,
  Text,
  WebView,
  StyleSheet,
  TouchableHighlight
} from 'react-native'
import Loading from './Loading'

console.log('Detail.js')

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
      loading: false,
      url: ''
    }
  }

  // 初期処理
  componentWillMount() {
    // this.ref = null
    const { params } = this.props.navigation.state
    console.log(typeof params.url)
    this.setState({
      url: params.url
    })
  }

  // ローディング画面
  renderLoading() {
    return <Loading />
  }

  goBack(): void {
    console.log('goBack')
    console.log(this)
    console.log(this.state)
    /*
    // stateの変更サンプル
    this.setState({
      loading: false,
      url: 'https://www.yahoo.co.jp/'
    })
    */
    console.log(this.webview)
    this.webview.goBack()
  }

  goForward(): void {
    console.log('goForward')
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

  /*
  onShouldStartLoadWithRequest(status: Object): boolean {
    console.log('onShouldStartLoadWithRequest')
    console.log(status)
    return true
  }
  */

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
          source={{ uri: this.state.url }}
          style={styles.view}
          // renderLoading={this.renderLoading}
          // startInLoadingState={true}
          javaScriptEnabled={true}
          onNavigationStateChange={this.onNavigationStateChange.bind(this)}
          onLoad={this.onLoad.bind(this)}
          onLoadStart={this.onLoadStart.bind(this)}
          // onShouldStartLoadWithRequest={this.onShouldStartLoadWithRequest.bind(this)}
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
    left: 150,
    right: 150,
    top: 150,
    bottom: 150,
    margin: 0,
    opacity: 1.0
  }
})
