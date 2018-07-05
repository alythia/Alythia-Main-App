import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn, darken}) => (
  <div className={darken ? 'navbar-fixed dark-navbar' : 'navbar-fixed'}>
    <nav className="transparent z-depth-0" id="nav">
      <div className="nav-wrapper transparent nav-container">
        <a href="/" className="nav-alythia">
          Alythia.
        </a>
        {isLoggedIn ? (
          <ul id="nav-mobile" className="right nav-text">
            <li>
              <Link to="/documentation" className="nav-text white-text">
                Documentation
              </Link>
            </li>
            <li>
              <a href="/" onClick={handleClick} className="nav-text white-text">
                Logout
              </a>
            </li>
          </ul>
        ) : (
          <ul id="nav-mobile" className="right">
            <li>
              <Link to="/documentation" className="nav-text white-text">
                Documentation
              </Link>
            </li>
            <li>
              <Link to="/login" className="nav-text white-text">
                Login
              </Link>
            </li>
            <li>
              <Link to="/signup" className="nav-text white-text">
                Sign Up
              </Link>
            </li>
          </ul>
        )}
      </div>
    </nav>
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.developer.id,
    darken: state.client.darkenNavbar
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
