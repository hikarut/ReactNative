/* @flow */

'use strict'

const GET_THREADS = 'GET_THREADS'
export const getThreads = (threads: Array<Object>) => ({
  type: GET_THREADS,
  // threads: threads
  threads
})

const LOADING = 'LOADING'
export const loadData = (loaded: boolean) => ({
  type: LOADING,
  loaded: loaded
  // loaded
})

const ERROR = 'ERROR'
export const getError = (status: boolean) => ({
  type: ERROR,
  hasError: status
  // status
})

// export function fetchData(url: string): Object {
export default function fetchData(url: string): Object {
  return dispatch => {
    dispatch(loadData(false))

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
      .then(console.log('fetchData end'))
      .catch(() => dispatch(getError(true)))
  }
}
