import 'react-native'
import React from 'react'
import Loading from '../src/components/Loading'
import renderer from 'react-test-renderer'

it('Loading', () => {
  const tree = renderer.create(<Loading />).toJSON()
  expect(tree).toMatchSnapshot()
})
