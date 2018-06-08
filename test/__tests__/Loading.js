import 'react-native'
import React from 'react'
import Loading from '../src/components/Loading'
import renderer from 'react-test-renderer'

it('renders correctly', () => {
  const tree = renderer.create(<Loading />)
  const expected = {}
  expect(tree).toMatchObject(expected)
})
