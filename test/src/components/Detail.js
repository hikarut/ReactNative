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

const { width, height } = Dimensions.get('window')

// 型の定義
type Props = {
  navigation: Object,
  load(status: boolean): Function,
  loaded: boolean
}

export default class Detail extends Component<Props> {
  props: Props
  webview: WebView

  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.title
  })

  constructor(props: Props) {
    super(props)
    this.props.load(false)
  }

  goBack(): void {
    this.webview.goBack()
  }

  goForward(): void {
    this.webview.goForward()
  }

  onNavigationStateChange(): void {}

  // ロード終了時に呼ばれる
  onLoad(): void {
    this.props.load(false)
  }

  // ロード開始時に呼ばれる
  onLoadStart(): void {
    this.props.load(true)
  }

  render() {
    const { params } = this.props.navigation.state

    let loading = null
    if (this.props.loaded) {
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
