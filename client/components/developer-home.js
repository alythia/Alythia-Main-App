import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
export const DeveloperHome = props => {
  const {email} = props

  return (
    <div>
      <h3>Welcome, {email}</h3>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.developer.email
  }
}

export default connect(mapState)(DeveloperHome)

/**
 * PROP TYPES
 */
DeveloperHome.propTypes = {
  email: PropTypes.string
}
