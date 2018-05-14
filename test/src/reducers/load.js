/* @flow */

'use strict'

export const detailLoadData = (state: boolean = false, action: Object) => {
  switch (action.type) {
    case 'DETAIL_LOADING':
      return action.loaded
    default:
      return state
  }
}
