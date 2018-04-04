/* @flow */

'use strict'

import { combineReducers } from 'redux'
import { NavigationView } from '../components/Main'

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

// 初期画面名を指定して初期ステートを作成
/*
const initialState = NavigationView.router.getStateForAction(
  NavigationView.router.getActionForPathAndParams('Home')
)
export const navgation = (state: Object = initialState, action: Object) => {
  const nextState = NavigationView.router.getStateForAction(action, state)
  return nextState || state
}
*/
// const defaultGetStateForAction = NavigationView.router.getStateForAction
// console.log(defaultGetStateForAction)
console.log('NavigationView')
console.log(NavigationView)

export default combineReducers({
  getThreads,
  loadData,
  getError
  // nav: navgation
})
