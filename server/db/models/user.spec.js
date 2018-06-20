/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const User = db.model('user')

describe('User model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('instanceMethods', () => {
    describe('correctPassword', () => {
      let dave

      beforeEach(async () => {
        dave = await User.create({
          name: 'dave',
          email: 'dmt@email.com',
          password: 'weeee'
        })
      })

      it('returns true if the password is correct', () => {
        expect(dave.correctPassword('weeee')).to.be.equal(true)
      })

      it('returns false if the password is incorrect', () => {
        expect(dave.correctPassword('yeeee')).to.be.equal(false)
      })
    }) // end describe('correctPassword')
  }) // end describe('instanceMethods')
}) // end describe('User model')
