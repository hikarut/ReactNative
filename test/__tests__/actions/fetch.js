import actions from '../../src/actions/fetch'

test('action fetch', () => {
  const obj = {}
  const result = actions.getThreads(obj)
  const expected = {
    type: 'GET_THREADS',
    threads: obj
  }
  expect(result).toEqual(expected)
})
