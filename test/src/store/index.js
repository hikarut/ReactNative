/* @flow */

// 'use strict'

import { createStore, applyMiddleware } from 'redux'
import rootReducer from '../reducers'
import thunk from 'redux-thunk'

const store = (initialState: Object = {}) => {
  return createStore(rootReducer, initialState, applyMiddleware(thunk))
}

export default store
