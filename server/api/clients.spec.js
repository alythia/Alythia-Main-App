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

  describe('/api/clients/', () => {
    const codysProject = 'puppybook'
    const codysWebsite = 'puppybook.com'

    beforeEach(() => {
      return Client.create({
        projectName: codysProject,
        website: codysWebsite
      })
    })

    xit('GET /api/clients/register', async () => {
      const res = await request(app)
        .get('/api/clients/register')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].projectName).to.be.equal(codysProject)
    })

    xit('GET /api/clients/register', async () => {
      const res = await request(app)
        .get('/api/clients/register')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].website).to.be.equal(codysWebsite)
    })
  }) // end describe('/api/clients')
}) // end describe('Client routes')
