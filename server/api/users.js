const router = require('express').Router()
const axios = require('axios')
const {User} = require('../db/models')
const redis = require('redis')

const redisClient = redis.createClient({
  host: 'localhost',
  port: 6379
})

module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['UUID', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const result = await User.create(req.body)
    res.json(result)
  } catch (err) {
    next(err)
  }
})

// Step #7-8 on flow chart: Alythia validates client + user information, if valid we send a POST to client backend with user email
router.post('/verify/:transactionIdentifier', async (req, res, next) => {
  try {
    // Verify user
    const userEmail = req.body.email
    const userIdentifier = req.body.userIdentifier
    const clientIdentifier = req.body.clientIdentifier
    const transactionIdentifier = req.body.transactionIdentifier

    const user = await User.findOne({where: {email: userEmail}})

    if (!user) {
      console.log('User not found:', userEmail)
      res.status(401).send(`Access denied, user does not exist: ${userEmail}`)
    } else if (!user.correctUUID(userIdentifier)) {
      console.log('Wrong user email and/or identifier:', userIdentifier)
      res.status(401).send('Access denied, incorrect user identifier.')
    }

    // Verify client and post to Client backend

    console.log('TRANSACTION ID: ', transactionIdentifier)
    console.log('CLIENT ID: ', clientIdentifier)

    await redisClient.get(transactionIdentifier, async function(err, reply) {
      if (err) {
        console.log('Redis error on GET: ', err)
      } else {
        console.log('Redis reply on GET: ', reply)
        if (user && clientIdentifier === reply) {
          // After user and client are verified, post to client user email
          const {data} = await axios.post(
            `http://172.16.23.189:8023/api/verify/${clientIdentifier}`,
            {email: userEmail}
          )
          const {io} = require('../index')
          io.emit('authorized', data)
          res.json(data)
        }
      }
    })
  } catch (error) {
    next(error)
  }
})
