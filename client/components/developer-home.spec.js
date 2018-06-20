/* global describe beforeEach it */

import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {DeveloperHome} from './developer-home'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('DeveloperHome', () => {
  let developerHome

  beforeEach(() => {
    developerHome = shallow(<DeveloperHome email="cody@email.com" />)
  })

  it('renders the email in an h3', () => {
    expect(developerHome.find('h3').text()).to.be.equal(
      'Welcome, cody@email.com'
    )
  })
})
