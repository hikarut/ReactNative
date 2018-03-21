/* @flow */

'use strict'

export const getThreads = (state: boolean = false, action: Object) => {
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
