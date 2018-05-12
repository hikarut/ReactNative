/* @flow */

'use strict'

import { Platform } from 'react-native'

class PlatformString {
  instructions = Platform.select({
    ios: 'Hello iOS!',
    android: 'Hello Android!'
  })
}

export default PlatformString
