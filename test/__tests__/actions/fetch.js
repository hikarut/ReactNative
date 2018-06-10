import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import actions from '../../src/actions/fetch'
import fetch from 'jest-fetch-mock'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

test('action fetch error', () => {
  fetch.mockResponse(JSON.stringify(['取得']))
  const expected = [
    {
      type: 'LOADING',
      loaded: false
    },
    {
      type: 'ERROR',
      hasError: true
    }
  ]
  const store = mockStore()
  const url = 'https://yahoo.co.jp/'

  return store.dispatch(actions(url)).then(() => {
    expect(store.getActions()).toEqual(expected)
  })
})

test('action fetch success', () => {
  fetch.mockResponse(JSON.stringify(['取得']))
  const expected = {
    type: 'LOADING',
    loaded: true
  }

  const store = mockStore()
  const url = 'https://qiita.com/api/v2/tags/reactjs/items'

  return store.dispatch(actions(url)).then(() => {
    const actions = store.getActions()
    expect(actions[1]).toEqual(expected)
  })
})
