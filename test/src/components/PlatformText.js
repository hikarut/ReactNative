/* @flow */

'use strict'

import React, { Component } from 'react'
import { Platform, StyleSheet, Text, View } from 'react-native'

const instructions = Platform.select({
  ios: 'Hello iOS!',
  android: 'Hello Android!'
})

export default class PlatformText extends Component<{}> {
  render() {
    return (
      <View>
        <Text style={styles.instructions}>{instructions}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  }
})
