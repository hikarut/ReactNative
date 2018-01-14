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
  loaded: boolean
}

// 型の定義
type Props = {
  navigation: Object,
  children?: Element
}

const WEBVIEW_REF = 'webview'

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

  // ローディング画面
  renderLoadingView() {
    return <Loading />
  }

  tap() {
    console.log('tap')
  }

  render() {
    const { params } = this.props.navigation.state
    console.log(params)

    return (
      <View style={styles.main}>
        <WebView
          ref={WEBVIEW_REF}
          source={{ uri: params.url }}
          style={styles.view}
          renderLoading={this.renderLoadingView}
          startInLoadingState={true}
        />
        <View style={styles.footerMenu}>
          <Text>aaaaa</Text>
          <TouchableHighlight onPress={this.tap}>
            <Text>ボタン</Text>
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
    // marginBottom: 40
    marginBottom: 0
  },
  footerMenu: {
    height: 50,
    justifyContent: 'center'
  }
})
