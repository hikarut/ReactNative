/* @flow */

'use strict'

import { combineReducers } from 'redux'

export const getThreads = (state: Array<Object> = [], action: Object) => {
  switch (action.type) {
    case 'GET_THREADS':
      return action.threads
    default:
      return state
  }
}

export const loadData = (state: boolean = false, action: Object) => {
  switch (action.type) {
    case 'LOADING':
      return action.loaded
    default:
      return state
  }
}

export const getError = (state: boolean = false, action: Object) => {
  switch (action.type) {
    case 'ERROR':
      return action.hasError
    default:
      return state
  }
}

export default combineReducers({
  getThreads,
  loadData,
  getError
  // nav: navgation
})
