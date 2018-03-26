/* @flow */

'use strict'

import { combineReducers } from 'redux'

/*
const initialState = {
  threads: {},
  loaded: false,
  hasError: false
}*/
// const initialState = {}

export const getThreads = (state: Array<Object> = [], action: Object) => {
  // export const getThreads = (state: Object = {}, action: Object) => {
  // export const getThreads = (state: Object = initialState, action: Object) => {
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
    /*
      return {
        ...state,
        threads: action.threads
      }
      */
    /*
      return Object.assign({}, state, {
        threads: action.threads
      })
      */
    default:
      return state
  }
}

export const loadData = (state: boolean = false, action: Object) => {
  // export const loadData = (state: Object = {}, action: Object) => {
  // export const loadData = (state: Object = initialState, action: Object) => {
  switch (action.type) {
    case 'LOADING':
      console.log('reducers return loaded')
      // console.log({ ...state, loaded: action.loaded })
      return action.loaded
    /*
      return {
        ...state,
        loaded: action.loaded
      }
      */
    /*
      return Object.assign({}, state, {
        loaded: action.loaded
      })
      */
    default:
      return state
  }
}

export const getError = (state: boolean = false, action: Object) => {
  // export const getError = (state: Object = {}, action: Object) => {
  // export const getError = (state: Object = initialState, action: Object) => {
  switch (action.type) {
    case 'ERROR':
      console.log('reducers return hasError')
      // console.log({ ...state, hasError: action.hasError })
      return action.hasError
    /*
      return {
        ...state,
        hasError: action.hasError
      }
      */
    /*
      return Object.assign({}, state, {
        hasError: action.hasError
      })
      */
    default:
      return state
  }
}

// export const redu = (state: Object = initialState, action: Object) => {
export const redu = (state: Object = {}, action: Object) => {
  console.log('action')
  console.log(action)
  switch (action.type) {
    case 'GET_THREADS':
      console.log('reducers return threads')
      console.log(state.threads)
      console.log(action.threads)
      return {
        ...state,
        loaded: action.threads
      }
    case 'LOADING':
      console.log('reducers return loading')
      return {
        ...state,
        loaded: action.loaded
      }
    case 'ERROR':
      console.log('reducers return error')
      return {
        ...state,
        hasError: action.hasError
      }
    default:
      return state
  }
}

export default combineReducers({
  getThreads,
  loadData,
  getError
})
/*
export default combineReducers({
  redu
})
*/
