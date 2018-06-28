const router = require('express').Router()
const axios = require('axios')
const {User, Client} = require('../db/models')
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

    const user = await User.findOne({where: {email: userEmail}})

    if (!user) {
      console.log('User not found:', userEmail)
      res.status(401).send(`Access denied, user does not exist: ${userEmail}`)
    } else if (!user.correctUUID(userIdentifier)) {
      console.log('Wrong user email and/or identifier:', userIdentifier)
      res.status(401).send('Access denied, incorrect user identifier.')
    }

    // Verify client
    const clientIdentifier = req.body.clientIdentifier
    const transactionIdentifier = req.body.transactionIdentifier

    const client = await Client.findOne(clientIdentifier)
    // TODO: We might have to look into Redis here to check that we get the right transaction UUID

    // After user and client are verified, post to client user email
    if (user && client) {
      const {data} = await axios.post(
        `/api/verify/${clientIdentifier}`,
        userEmail
      )
      console.log(`POST req to CLIENT with user email: ${userEmail}`)
      console.log(`POST res received from CLIENT: ${data}`)
      res.json(data)
    }
  } catch (error) {
    next(error)
  }
})

// Step #10 on flow chart: Client sends POST request with unique token indicating user has been authorized on their end
router.post('/auth/confirm/:userClientToken', async (req, res, next) => {
  const userToken = req.params.userClientToken
  // TODO: send this token with window.location info across socket
})
