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

const qiitaUrl = 'https://qiita.com/api/v2/tags/reactjs/items'
const { width } = Dimensions.get('window')

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
  // class Home extends Component<Props, State> {
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
    console.log('Home')
    console.log(this.props)
  }

  // 初期処理
  componentWillMount() {
    this.fetchData()
    console.log('Home componentWillMount')
    console.log(this.props)
  }

  componentDidMount() {
    console.log('Home componentDidMount')
    console.log(this.props)
  }

  // API呼び出し
  fetchData(): void {
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
