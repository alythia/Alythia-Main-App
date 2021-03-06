const router = require('express').Router()
const axios = require('axios')
const {User} = require('../db/models')
const {redisClient} = require('../redis')

module.exports = router

router.post('/', async (req, res, next) => {
  try {
    const result = await User.create(req.body)
    res.json(result)
  } catch (err) {
    next(err)
  }
})

// Step #7-8 on flow chart: Alythia validates client + user information, if valid we send a POST to client backend with user email
router.post('/verify/', async (req, res, next) => {
  try {
    const {io} = require('../index')
    io.emit('QRscanned')
    // Verify user
    const userEmail = req.body.email
    const userIdentifier = req.body.userIdentifier
    const clientIdentifier = req.body.clientIdentifier
    const transactionIdentifier = req.body.transactionIdentifier
    const website = req.body.website

    const user = await User.findOne({where: {email: userEmail}})
    if (!user) {
      console.log('User not found:', userEmail)
      res.status(401).send(`Access denied, user does not exist: ${userEmail}`)
    } else if (!user.correctUUID(userIdentifier)) {
      console.log('Wrong user email and/or identifier:', userIdentifier)
      res.status(401).send('Access denied, incorrect user identifier.')
    }

    await redisClient.get(transactionIdentifier, async function(err, reply) {
      if (err) {
        console.log('Redis error on GET: ', err)
      } else {
        if (user && clientIdentifier === reply) {
          const {data} = await axios.post(
            `${website}/auth/alythia/verify/${userIdentifier}`,
            {email: userEmail}
          )
          console.log('result data', data)
          io.emit('authorized', {loginIdentifier: userIdentifier})
          res.json(data)
        }
      }
    })
  } catch (error) {
    next(error)
  }
})

router.put('/', async (req, res, next) => {
  try {
    const {newEmail, oldEmail, UUID} = req.body
    const user = await User.findOne({where: {email: oldEmail}})

    if (user && user.correctUUID(UUID)) {
      await user.update({email: newEmail})
      res.status(200).send('Success')
    } else {
      res.status(404).send('Not found')
    }
  } catch (err) {
    next(err)
  }
})

router.delete('/:userUUID', async (req, res, next) => {
  try {
    const {email} = req.body
    const {userUUID} = req.params

    const user = await User.findOne({where: {email}})

    if (user.correctUUID(userUUID)) {
      await User.destroy({where: {id: user.id}})
      res.status(200).send('Success')
    } else {
      res.status(404).send('Not found')
    }
  } catch (err) {
    next(err)
  }
})
