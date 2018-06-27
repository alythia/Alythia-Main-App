/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const User = db.model('user')

describe('User model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  // describe('instanceMethods', () => {
  describe('password', () => {
    let dave

    beforeEach(async () => {
      dave = await User.create({
        name: 'dave',
        email: 'dmt@email.com',
        active: 'true'
      })
    })

    xit('returns true if there is an existing user', () => {
      expect(dave.name).to.be.equal('dave')
    })

    xit('returns true if there is an existing user email', () => {
      expect(dave.email).to.be.equal('dmt@email.com')
    })
    xit('returns whether user is active', () => {
      expect(dave.active).to.be.equal(true)
    })
  }) // end describe('correctPassword')
  // }) // end describe('instanceMethods')
}) // end describe('User model')
