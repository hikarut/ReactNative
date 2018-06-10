/* @flow */

'use strict'

export const getThreads = (threads: Array<Object>) => ({
  type: 'GET_THREADS',
  threads: threads
})

export const loadData = (loaded: boolean) => ({
  type: 'LOADING',
  loaded: loaded
})

export const getError = (status: boolean) => ({
  type: 'ERROR',
  hasError: status
})

export default function fetchData(url: string): Object {
  return dispatch => {
    dispatch(loadData(false))

    return fetch(url)
      .then(response => response.json())
      .then(responseData => {
        const data = responseData.map(i => {
          const tmp = {}
          // keyとdataに分けてセットしないとエラーではないがFlowのチェックに弾かれる
          // FlatList用にkeyにtitleをセット
          tmp.key = i.title
          // それ以外をdataにセット
          tmp.data = i
          return tmp
        })
        dispatch(loadData(true))
        return data
      })
      .then(data => dispatch(getThreads(data)))
      .catch(() => dispatch(getError(true)))
    /*
    fetch(url)
      .then(response => response.json())
      .then(responseData => {
        const data = responseData.map(i => {
          const tmp = {}
          // keyとdataに分けてセットしないとエラーではないがFlowのチェックに弾かれる
          // FlatList用にkeyにtitleをセット
          tmp.key = i.title
          // それ以外をdataにセット
          tmp.data = i
          return tmp
        })
        dispatch(loadData(true))
        return data
      })
      .then(data => dispatch(getThreads(data)))
      .catch(() => dispatch(getError(true)))
    */
  }
}
