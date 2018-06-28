const router = require('express').Router()
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

router.get('/verify/:transactionUUID', async (req, res, next) => {
  try {
    const user = await User.findOne(req.body.userIdentifier)
    const client = await Client.findOne(req.body.userIdentifier)
    user && client ? res.json({user, client})
  } catch (error) {
    next(error)
  }
})
