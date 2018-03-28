/* @flow */

'use strict'

import { combineReducers } from 'redux'

export const getThreads = (state: Array<Object> = [], action: Object) => {
  console.log('action')
  console.log(action)
  console.log('state')
  console.log(state)
  switch (action.type) {
    case 'GET_THREADS':
      console.log('reducers return threads')
      // console.log({ ...state, threads: action.threads })
      console.log(action.threads)
      return action.threads
    default:
      return state
  }
}

export const loadData = (state: boolean = false, action: Object) => {
  switch (action.type) {
    case 'LOADING':
      console.log('reducers return loaded')
      // console.log({ ...state, loaded: action.loaded })
      return action.loaded
    default:
      return state
  }
}

export const getError = (state: boolean = false, action: Object) => {
  switch (action.type) {
    case 'ERROR':
      console.log('reducers return hasError')
      // console.log({ ...state, hasError: action.hasError })
      return action.hasError
    default:
      return state
  }
}

export default combineReducers({
  getThreads,
  loadData,
  getError
})
