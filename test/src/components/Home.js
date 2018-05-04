/* @flow */

'use strict'

import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  Dimensions,
  Linking
} from 'react-native'
import Loading from './Loading'
import PlatformText from './PlatformText'
import ImageList from './ImageList'
import configureStore from '../store'
import { Provider } from 'react-redux'

const qiitaUrl = 'https://qiita.com/api/v2/tags/reactjs/items'
// console.log(qiitaUrl)
const { width } = Dimensions.get('window')

const store = configureStore()

// 型の定義
type State = {
  threads: Array<Object>,
  loaded: boolean,
  hasError: boolean
}

// 型の定義
type Props = {
  navigation: Object,
  threads: Array<Object>,
  loaded: boolean,
  hasError: boolean
}

// メインとなるページ
export default class Home extends Component<Props, State> {
  state: State
  props: Props

  static navigationOptions = {
    title: 'Home'
  }

  constructor(props: Props) {
    super(props)
    this.state = {
      // FlatList用に配列にする
      threads: [],
      loaded: false,
      hasError: false
    }
  }

  // 初期処理
  componentWillMount() {
    // console.log('componentWillMount')
    this.fetchData()

    // this.props.fetchData(qiitaUrl)
    // console.log('---this.props---')
    // console.log(this.props)
    // this.props.fetchData(qiitaUrl)

    // fetchDataが非同期なのでこのタイミングではthreadsは空
    // const threads = this.state
    // console.log(threads)
  }

  componentDidMount() {
    // this.props.fetchData(qiitaUrl)
    // console.log('---after fetchData this.props---')
    // console.log('componentDidMount')
    // console.log(this.props)
  }

  // API呼び出し
  fetchData(): void {
    // console.log('fetchData')
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
        // console.log(data)

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
      <Provider store={store}>
        <View style={styles.container}>
          <PlatformText />
          <ImageList />
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
                      navigate('Detail', {
                        title: item.key,
                        url: item.data.url
                      })
                    }
                  >
                    {item.data.created_at}
                  </Text>
                </View>
              </View>
            )}
          />
        </View>
      </Provider>
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
