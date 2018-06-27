/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Developer = db.model('developer')

describe('Developer routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/developers/', () => {
    const codysEmail = 'cody@puppybook.com'

    beforeEach(() => {
      return Developer.create({
        email: codysEmail
      })
    })

    it('GET /api/developers', async () => {
      const res = await request(app)
        .get('/api/developers')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].email).to.be.equal(codysEmail)
    })
  }) // end describe('/api/developers')
}) // end describe('Developer routes')
