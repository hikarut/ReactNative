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

const qiitaUrl = 'https://qiita.com/api/v2/tags/reactjs/items'
const { width } = Dimensions.get('window')

// 型の定義
type Props = {
  fetchData(url: string): Function,
  navigation: Object,
  threads: Array<Object>,
  loaded: boolean,
  hasError: boolean
}

export default class ImageList extends Component<Props> {
  constructor(props: Props) {
    super(props)
  }

  componentDidMount() {
    this.props.fetchData(qiitaUrl)
  }

  render() {
    const { navigate } = this.props.navigation

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
      )
    }
  }
}

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
