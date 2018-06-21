import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {Input} from 'react-materialize'
import {auth} from '../store'

const AuthForm = props => {
  const {name, displayName, handleSubmit, error} = props

  return (
    <div className="container">
      <form onSubmit={handleSubmit} name={name}>
        <div>
          <Input
            type="email"
            name="email"
            htmlFor="email"
            label="Email"
            s={12}
          />
        </div>
        <div>
          <label htmlFor="password">
            <small>Password</small>
          </label>
          <input name="password" type="password" />
        </div>
        <div>
          <button type="submit">{displayName}</button>
        </div>
        {error && error.response && <div> {error.response.data} </div>}
        <a href="/auth/google">
          <div className="btn_google center">
            <img src="/img/btn_google.svg" />
            <p>{displayName} with Google</p>
          </div>
        </a>
      </form>
    </div>
  )
}

const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.developer.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.developer.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(auth(email, password, formName))
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
