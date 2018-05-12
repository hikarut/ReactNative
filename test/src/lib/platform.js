/* @flow */

'use strict'

import { Platform } from 'react-native'

/*
export default instructions = Platform.select({
  ios: 'Hello iOS!',
  android: 'Hello Android!'
})
*/
class PlatformLib {
  instructions = Platform.select({
    ios: 'Hello iOS!',
    android: 'Hello Android!'
  })
}

// module.exports = PlatformLib
export default PlatformLib
