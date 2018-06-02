/* @flow */

'use strict'

import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import actions from '../actions/fetch'
import ImageList from '../components/ImageList'

// reduxとの連携
ImageList.propTypes = {
  threads: PropTypes.array.isRequired,
  loaded: PropTypes.bool.isRequired,
  hasError: PropTypes.bool.isRequired
}
const mapStateToProps = state => ({
  threads: state.getThreads,
  loaded: state.loadData,
  hasError: state.getError,
  nav: state.nav
})
const mapDispatchToProps = dispatch => ({
  fetchData: url => dispatch(actions(url))
})

export default connect(mapStateToProps, mapDispatchToProps)(ImageList)
