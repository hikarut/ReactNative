/* @flow */

'use strict'

export const detailLoadData = (loaded: boolean) => ({
  type: 'DETAIL_LOADING',
  loaded: loaded
})

export default function detailLoaded(status: boolean): Object {
  return dispatch => {
    dispatch(detailLoadData(status))
  }
}
