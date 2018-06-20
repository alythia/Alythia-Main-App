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

router.post('/register', async (req, res, next) => {
  try {
    const {projectName, website} = req.body
    console.log(req.body)
    const result = await Client.create({
      projectName,
      website
    })
    res.json(result)
  } catch (err) {
    next(err)
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
