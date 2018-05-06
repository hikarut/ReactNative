/* @flow */

'use strict'

import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  Linking,
  Dimensions
} from 'react-native'
import Loading from './Loading'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import actions from '../actions/fetch'

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
  fetchData(url: string): Object,
  navigation: Object,
  threads: Array<Object>,
  loaded: boolean,
  hasError: boolean
}

// export default class ImageList extends Component<{}> {
class ImageList extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    console.log('Imag eList')
    console.log(props)
  }

  componentDidMount() {
    this.props.fetchData(qiitaUrl)
    console.log('---ImageList after fetchData this.props---')
    console.log('ImageList componentDidMount')
    console.log(this.props)
  }

  render() {
    console.log('==ImageList this.props.loaded==')
    console.log(this.props.loaded)
    console.log(this.props.threads)

    if (!this.props.loaded) {
      return <Loading />
    } else {
      return (
        <FlatList
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
                <Text
                  style={styles.date}
                  /*
                onPress={() =>
                  navigate('Detail', {
                    title: item.key,
                    url: item.data.url
                  })
                }
                */
                >
                  {item.data.created_at}
                </Text>
              </View>
            </View>
          )}
        />
      )
    }
  }
}

// reduxとの連携
ImageList.propTypes = {
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
export default connect(mapStateToProps, mapDispatchToProps)(ImageList)

const styles = StyleSheet.create({
  list: {
    flex: 1,
    flexDirection: 'row',
    width: width
  },
  thumbnail: {
    width: 80,
    height: 80,
    margin: 2
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
  rightContainer: {
    flex: 1
  }
})
