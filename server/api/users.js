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

    // Verify client and post to Client backend
    await redisClient.get(transactionIdentifier, async function(err, reply) {
      if (err) {
        console.log('Redis error on GET: ', err)
      } else {
        console.log('Redis reply on GET: ', reply)

        if (user && clientIdentifier === reply) {
          // After user and client are verified, post to client user email
          const {data} = await axios.post(
            `${website}/auth/verify/${clientIdentifier}`,
            {email: userEmail}
          )
          console.log('res from client --> ', data)

          io.emit('authorized', data)
          console.log('socket just emitted --| ')
          res.json(data)
        }
      }
    })
  } catch (error) {
    next(error)
  }
})

router.delete('/delete/:userUUID', async (req, res, next) => {
  try {
    await User.destroy({where: {UUID: req.params.userUUID}})
    res.status(200)
  } catch (err) {
    next(err)
  }
})
