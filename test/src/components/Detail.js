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
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import actions from '../actions/load'

console.log('Detail.js')
const { width, height } = Dimensions.get('window')

// 型の定義
type Props = {
  navigation: Object,
  load(status: boolean): Function,
  children?: Element,
  loaded: boolean
}

class Detail extends Component<Props> {
  props: Props
  webview: WebView

  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.title
  })

  constructor(props: Props) {
    super(props)
    this.props.load(false)
    console.log('Detail props')
    console.log(this.props)
  }

  // 初期処理
  componentWillMount() {}

  // ローディング画面
  renderLoading() {
    return <Loading />
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
    console.log('onLoad')
  }

  // ロード開始時に呼ばれる
  onLoadStart(): void {
    this.props.load(true)
    console.log('onLoadStart')
  }

  render() {
    const { params } = this.props.navigation.state

    let loading = null
    // if (this.state.loading) {
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

// reduxとの連携
Detail.propTypes = {
  loaded: PropTypes.bool.isRequired
}
const mapStateToProps = state => ({
  loaded: state.detailLoadData
})
const mapDispatchToProps = dispatch => ({
  load: status => dispatch(actions(status))
})
export default connect(mapStateToProps, mapDispatchToProps)(Detail)

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
