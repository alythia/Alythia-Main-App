const router = require('express').Router()
const {Client} = require('../db/models')
module.exports = router

router.post('/register', async (req, res, next) => {
  try {
    const {appName, website} = req.body
    console.log(req.body)
    const result = await Client.create({
      appName,
      website
    })
    res.json(result)
  } catch (err) {
    next(err)
  }
})
