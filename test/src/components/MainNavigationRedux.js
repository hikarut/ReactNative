/* @flow */

'use strict'

import React, { Component } from 'react'
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
import { StackNavigator, addNavigationHelpers } from 'react-navigation'
import { connect } from 'react-redux'
import { Provider } from 'react-redux'
import {
  createReduxBoundAddListener,
  createReactNavigationReduxMiddleware
} from 'react-navigation-redux-helpers'
import { combineReducers } from 'redux'
import { createStore, applyMiddleware } from 'redux'

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

  constructor(props: Props) {
    super(props)
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

  componentDidMount() {
    // this.props.fetchData(qiitaUrl)
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

// ナビゲーションの定義
// const store = configureStore()
export const NavigationView = StackNavigator(
  {
    Home: { screen: Home },
    // Home: { screen: <Provider store={store}>Home</Provider> },
    Detail: { screen: Detail }
  },
  {
    initialRouteName: 'Home'
  }
)

// navigation-redux
const initialState = NavigationView.router.getStateForAction(
  NavigationView.router.getActionForPathAndParams('Home')
)
console.log('initialState')
console.log(initialState)
const navReducer = (state = initialState, action) => {
  const nextState = NavigationView.router.getStateForAction(action, state)
  return nextState || state
}
const appReducer = combineReducers({
  nav: navReducer
})
const middleware = createReactNavigationReduxMiddleware(
  'root',
  state => state.nav
)
const addListener = createReduxBoundAddListener('root')

// ナビゲーションを表示
// export default class Main extends Component<{}> {
class App extends Component<{}> {
  render() {
    return (
      <NavigationView
        navigation={addNavigationHelpers({
          dispatch: this.props.dispatch,
          state: this.props.nav,
          addListener
        })}
      />
    )
  }
}
const mapStateToProps = state => ({
  nav: state.nav,
  threads: 'Threads'
})
const AppWithNavigationState = connect(mapStateToProps)(App)
const store = createStore(appReducer, applyMiddleware(middleware))
export default class Main extends Component<{}> {
  render() {
    return (
      <Provider store={store}>
        <AppWithNavigationState />
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