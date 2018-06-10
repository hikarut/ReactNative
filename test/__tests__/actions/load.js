import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import actions from '../../src/actions/load'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

test('action load true', () => {
  const expected = {
    type: 'DETAIL_LOADING',
    loaded: true
  }

  const store = mockStore()

  store.dispatch(actions(true))
  const action = store.getActions()
  expect(action[0]).toEqual(expected)
})
