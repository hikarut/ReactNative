/* @flow */

'use strict'

import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import ImageList from './ImageList'
import PlatformString from '../lib/platform'

const instructions = new PlatformString().instructions

// 型の定義
type Props = {
  navigation: Object
}

// メインとなるページ
export default class Home extends Component<Props> {
  props: Props

  static navigationOptions = {
    title: instructions
  }

  render() {
    return (
      <View style={styles.container}>
        <ImageList navigation={this.props.navigation} />
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
  }
})
