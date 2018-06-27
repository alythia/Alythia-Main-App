/* global describe beforeEach afterEach it */

import {expect} from 'chai'
import {me, logout} from './developer'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
import history from '../history'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('thunk creators', () => {
  let store
  let mockAxios

  const initialState = {developer: {}}

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
    store = mockStore(initialState)
  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })

  describe('me', () => {
    it('eventually dispatches the GET DEVELOPER action', async () => {
      const fakeDeveloper = {email: 'Cody'}
      mockAxios.onGet('/auth/me').replyOnce(200, fakeDeveloper)
      await store.dispatch(me())
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('GET_DEVELOPER')
      expect(actions[0].developer).to.be.deep.equal(fakeDeveloper)
    })
  })

  describe('logout', () => {
    it('logout: eventually dispatches the REMOVE_DEVELOPER action', async () => {
      mockAxios.onPost('/auth/logout').replyOnce(204)
      await store.dispatch(logout())
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('REMOVE_DEVELOPER')
      expect(history.location.pathname).to.be.equal('/login')
    })
  })
})
