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

router.get('/:projectID', async (req, res, next) => {
  try {
    const client = await Client.findOne({
      where: {projectID: req.params.projectID}
    })
    res.json(client)
  } catch (error) {
    next(error)
  }
})

router.post('/new-project', async (req, res, next) => {
  try {
    const newProject = await Client.create(req.body)
    res.json(newProject)
  } catch (error) {
    next(error)
  }
})
