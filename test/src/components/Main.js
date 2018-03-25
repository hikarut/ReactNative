/* @flow */

'use strict'

import React, { Component } from 'react'
// import PropTypes from 'prop-types'
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
import Detail from './Detail'
import Loading from './Loading'
// import type { Threads } from '../config/types'
import { StackNavigator } from 'react-navigation'
import { connect } from 'react-redux'
import actions from '../actions/fetch'

console.log('Main.js')

const instructions = Platform.select({
  ios: 'Hello iOS!',
  android: 'Hello Android!'
})

const qiitaUrl = 'https://qiita.com/api/v2/tags/reactjs/items'
console.log(qiitaUrl)
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
}

// メインとなるページ
class Home extends Component<Props, State> {
  state: State
  props: Props

  static navigationOptions = {
    title: 'Home'
  }

  constructor() {
    super()
    this.state = {
      //threads: {},
      // FlatList用に配列にする
      threads: [],
      loaded: false,
      hasError: false
      // dataSource: {}
    }
  }

  // 初期処理
  componentWillMount() {
    console.log('componentWillMount')
    this.fetchData()

    // this.props.fetchData(qiitaUrl)
    console.log('---this.props---')
    console.log(this.props)
    // this.props.fetchData(qiitaUrl)

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
    if (!this.state.loaded) {
      return this.renderLoadingView()
    }

    // ナビゲーション
    const { navigate } = this.props.navigation

    return (
      <View style={styles.container}>
        <Text style={styles.instructions}>{instructions}</Text>
        <FlatList
          data={this.state.threads}
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
                <Text
                  style={styles.date}
                  onPress={() =>
                    navigate('Detail', { title: item.key, url: item.data.url })
                  }
                >
                  {item.data.created_at}
                </Text>
              </View>
            </View>
          )}
        />
      </View>
    )
  }
}

// reduxとの連携
/*
Home.propTypes = {
  threads: PropTypes.array.isRequired,
  loaded: PropTypes.array.isRequired,
  hasError: PropTypes.bool.isRequired
}
*/
const mapStateToProps = state => ({
  threads: state.threads,
  loaded: state.loaded,
  hasError: state.hasError
})
const mapDispatchToProps = dispatch => ({
  fetchData: url => dispatch(actions(url))
})
connect(mapStateToProps, mapDispatchToProps)(Home)

// ナビゲーションの定義
const NavigationView = StackNavigator(
  {
    Home: { screen: Home },
    Detail: { screen: Detail }
  },
  {
    initialRouteName: 'Home'
  }
)

// ナビゲーションを表示
export default class Main extends Component<{}> {
  render() {
    return <NavigationView />
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
