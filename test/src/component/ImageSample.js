/* @flow */

import React, { Component } from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'

export default class ImageSample extends Component<{}> {
  render() {
    return (
      <View>
        <Text>this is ImageSample</Text>
        <Image
          style={styles.reactImage}
          source={require('./React-icon-mini2.png')}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  reactImage: {
    width: 50,
    height: 50,
    padding: 50
  }
})
