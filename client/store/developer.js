import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_DEVELOPER = 'GET_DEVELOPER'
const REMOVE_DEVELOPER = 'REMOVE_DEVELOPER'

/**
 * INITIAL STATE
 */
const defaultDeveloper = {}

/**
 * ACTION CREATORS
 */
const getDeveloper = developer => ({type: GET_DEVELOPER, developer})
const removeDeveloper = () => ({type: REMOVE_DEVELOPER})

/**
 * THUNK CREATORS
 */
export const me = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me')
    dispatch(getDeveloper(res.data || defaultDeveloper))
  } catch (err) {
    console.error(err)
  }
}

export const auth = (email, password, method) => async dispatch => {
  let res
  try {
    res = await axios.post(`/auth/${method}`, {email, password})
  } catch (authError) {
    return dispatch(getDeveloper({error: authError}))
  }
  try {
    dispatch(getDeveloper(res.data))
    history.push('/')
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout')
    dispatch(removeDeveloper())
    history.push('/login')
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultDeveloper, action) {
  switch (action.type) {
    case GET_DEVELOPER:
      return action.developer
    case REMOVE_DEVELOPER:
      return defaultDeveloper
    default:
      return state
  }
}
