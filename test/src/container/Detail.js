/* @flow */

'use strict'

import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import actions from '../actions/load'
import Detail from '../components/Detail'

// reduxとの連携
Detail.propTypes = {
  loaded: PropTypes.bool.isRequired
}
const mapStateToProps = state => ({
  loaded: state.detailLoadData
})
const mapDispatchToProps = dispatch => ({
  load: status => dispatch(actions(status))
})

export default connect(mapStateToProps, mapDispatchToProps)(Detail)
