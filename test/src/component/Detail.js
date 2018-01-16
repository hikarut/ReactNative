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
  loaded: boolean,
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
      loaded: false,
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

  tap(): void {
    console.log('tap')
    console.log(this)
    console.log(this.state)
    /*
    // stateの変更サンプル
    this.setState({
      loaded: false,
      url: 'https://www.yahoo.co.jp/'
    })
    */
    console.log(this.webview)
    this.webview.goBack()
  }

  onNavigationStateChange(status: Object): void {
    // 戻る、進ができるか状態が見れる
    console.log('onNavigationStateChange')
    console.log(status)
  }

  onLoad(status: Object): void {
    console.log('onLoad')
    console.log(status)
  }

  onLoadStart(status: Object): void {
    console.log('onLoadStart')
    console.log(status)
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

    return (
      <View style={styles.main}>
        <WebView
          ref={webview => {
            this.webview = webview
          }}
          source={{ uri: this.state.url }}
          style={styles.view}
          renderLoading={this.renderLoading}
          startInLoadingState={true}
          javaScriptEnabled={true}
          onNavigationStateChange={this.onNavigationStateChange.bind(this)}
          onLoad={this.onLoad.bind(this)}
          onLoadStart={this.onLoadStart.bind(this)}
          // onShouldStartLoadWithRequest={this.onShouldStartLoadWithRequest.bind(this)}
        />
        <View style={styles.footerMenu}>
          <TouchableHighlight onPress={this.tap.bind(this)}>
            <Text>戻る</Text>
          </TouchableHighlight>
        </View>
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
    justifyContent: 'center'
  }
})
