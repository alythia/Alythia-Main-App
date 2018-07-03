const router = require('express').Router()
const uuidv4 = require('uuid/v4')
const {Client} = require('../db/models')
const jwt = require('jsonwebtoken')
const {redisClient} = require('../redis')

module.exports = router

router.post('/new-project', async (req, res, next) => {
  try {
    const result = await Client.create(req.body)
    res.json(result)
  } catch (err) {
    next(err)
  }
})

// POST /api/clients/4/verify?token=65765574576
// post('/:id/verify') --restful
router.post('/verify', async (req, res, next) => {
  const {client_id, token} = req.body

  try {
    const result = await Client.findOne({where: {client_id}})
    if (result) {
      const {secret_key} = result
      setTimeout(() => {
        jwt.verify(token, secret_key, (err, decoded) => {
          if (!err) {
            res.send(decoded)
          } else {
            res.status(401).send()
          }
        })
      }, 2000)
    } else res.status(401).send('Invalid token')
  } catch (error) {
    console.log('/client/verify', error.message)
    next(error)
  }
})

router.get('/:client_id', async (req, res, next) => {
  const {client_id} = req.params
  const UUID = uuidv4()

  try {
    const client = await Client.findOne({
      where: {client_id}
    })

    await redisClient.set(UUID, client_id, function(err, reply) {
      err
        ? console.log('Redis error on SET: ', err)
        : console.log('Redis SET: ', `${UUID}: ${client_id}`)
    })

    const {secret_key, public_key, projectName, website} = client
    const result = {
      projectName,
      website,
      clientIdentifier: client_id,
      transactionIdentifier: UUID
    }
    const token = jwt.sign(result, secret_key)
    console.log(token, client_id)
    res.redirect(`/auth/identify?token=${token}&client_id=${client_id}`)
  } catch (error) {
    next(error)
  }
})
// express middleware instead of redirect, function isn't triggered until client makes check if stuff given back is valid

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
