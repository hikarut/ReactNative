/* @flow */

'use strict'

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Platform,
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  Dimensions,
  Linking
} from 'react-native'
import Loading from './Loading'
// import type { Threads } from '../config/types'
import { connect } from 'react-redux'
import actions from '../actions/fetch'

console.log('ReduxSample.js')

const instructions = Platform.select({
  ios: 'Hello iOS!',
  android: 'Hello Android!'
})

const qiitaUrl = 'https://qiita.com/api/v2/tags/reactjs/items'
const { width } = Dimensions.get('window')

// 型の定義
type State = {
  // threads: Array<Threads>
  threads: Array<Object>,
  // threads: Object,
  loaded: boolean,
  hasError: boolean
  // dataSource: Object
}

// 型の定義
type Props = {
  navigation: Object,
  threads: Array<Object>,
  loaded: boolean,
  hasError: boolean
  // fetchData: Object
}

// メインとなるページ
// export default class ReduxSample extends Component<Props, State> {
class ReduxSample extends Component<Props, State> {
  state: State
  props: Props

  constructor(props: Props) {
    // constructor() {
    super(props)
    // super()
    /*
    this.state = {
      //threads: {},
      // FlatList用に配列にする
      threads: [],
      loaded: false,
      hasError: false
      // dataSource: {}
    }
    */
  }

  // 初期処理
  componentWillMount() {
    console.log('componentWillMount')
    // this.fetchData()

    // this.props.fetchData(qiitaUrl)
    console.log('---this.props---')
    console.log(this.props)
    // this.props.fetchData(qiitaUrl)
  }

  componentDidMount() {
    this.props.fetchData(qiitaUrl)
    console.log('---after fetchData this.props---')
    console.log('componentDidMount')
    console.log(this.props)
    /*
    setTimeout(() => {
      console.log('I do not leak!')
      console.log(this.props)
    }, 5000)
    */
  }

  // API呼び出し
  fetchData(): void {
    console.log('fetchData')
    fetch(qiitaUrl)
      .then(response => response.json())
      .then(responseData => {
        const data = responseData.map(i => {
          const tmp = {}
          // keyとdataに分けてセットしないとエラーではないがFlowのチェックに弾かれる
          // FlatList用にkeyにtitleをセット
          tmp.key = i.title
          // それ以外をdataにセット
          tmp.data = i
          return tmp
        })
        console.log(data)

        this.setState({
          // threads: responseData,
          threads: data,
          loaded: true
        })
      })
      .done()
  }

  // ローディング画面
  renderLoadingView() {
    return <Loading />
  }

  render() {
    // if (!this.state.loaded) {
    console.log('==this.props.loaded==')
    console.log(this.props.loaded)
    console.log(this.props.threads)
    if (!this.props.loaded) {
      return this.renderLoadingView()
    }

    return (
      <View style={styles.container}>
        <Text style={styles.instructions}>{instructions}</Text>
        <FlatList
          // data={this.state.threads}
          data={this.props.threads}
          renderItem={({ item }) => (
            <View style={styles.list}>
              <Image
                source={{ uri: item.data.user.profile_image_url }}
                style={styles.thumbnail}
              />
              <View style={styles.rightContainer}>
                <Text
                  style={styles.title}
                  onPress={() => Linking.openURL(item.data.url)}
                >
                  {item.key}
                </Text>
                <Text style={styles.date}>{item.data.created_at}</Text>
              </View>
            </View>
          )}
        />
      </View>
    )
  }
}

// reduxとの連携
ReduxSample.propTypes = {
  threads: PropTypes.array.isRequired,
  loaded: PropTypes.bool.isRequired,
  hasError: PropTypes.bool.isRequired
}
const mapStateToProps = state => ({
  threads: state.getThreads,
  loaded: state.loadData,
  hasError: state.getError
})
const mapDispatchToProps = dispatch => ({
  fetchData: url => dispatch(actions(url))
})
export default connect(mapStateToProps, mapDispatchToProps)(ReduxSample)

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
  },
  title: {
    fontSize: 15,
    margin: 8,
    textAlign: 'left'
    // flexWrap: 'wrap'
  },
  date: {
    fontSize: 10,
    margin: 8,
    textAlign: 'left',
    flexWrap: 'wrap'
  },
  thumbnail: {
    width: 80,
    height: 80,
    margin: 2
  },
  list: {
    flex: 1,
    flexDirection: 'row',
    // 画面一杯
    width: width
  },
  rightContainer: {
    flex: 1
  }
})
