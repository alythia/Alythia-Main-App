/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Client = db.model('client')

describe('Client routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/clients/register/', () => {
    // const codysProject = 'puppybook'
    // const codysWebsite = 'puppybook.com'

    beforeEach(() => {
      return Client.create({
        projectName: 'puppybook',
        website: 'www.puppybook.com'
      })
    })

    it('GET /api/clients/register', async () => {
      const res = await request(app)
        .get('/api/clients/')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].projectName).to.be.equal('puppybook')
    })

    xit('GET /api/clients/register', async () => {
      const res = await request(app)
        .get('/api/clients/')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].website).to.be.equal('www.puppybook.com')
    })
  }) // end describe('/api/clients')
}) // end describe('Client routes')
