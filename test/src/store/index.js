/* @flow */

// 'use strict'

import { createStore } from 'redux'
import rootReducer from '../reducers'

const store = (initialState: Object = {}) => {
  return createStore(rootReducer, initialState)
}

export default store
