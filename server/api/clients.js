const router = require('express').Router()
const {Client} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const clients = await Client.findAll()
    res.json(clients)
  } catch (error) {
    next(error)
  }
})

router.post('/new-project', async (req, res, next) => {
  try {
    console.log(req.body)
    const result = await Client.create(req.body)
    res.json(result)
  } catch (err) {
    next(err)
  }
})

router.post('/verify', async (req, res, next) => {
  const clientToken = req.body.token
  try {
    const result = await Client.findOne({where: {APItoken: clientToken}})
    if (result) res.status(200).send()
    else res.status(401).send('Invalid token')
  } catch (error) {
    console.log('/client/verify', error.message)
    next(error)
  }
})

// router.get('/:projectID', async (req, res, next) => {
//   try {
//     const client = await Client.findOne({
//       where: {projectID: req.params.projectID}
//     })
//     res.json(client)
//   } catch (error) {
//     next(error)
//   }
// })
