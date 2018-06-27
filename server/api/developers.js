const router = require('express').Router()
const {Developer} = require('../db/models')
const {Client} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const developers = await Developer.findAll({
      // explicitly select only the id and email fields - even though
      // developers' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
    res.json(developers)
  } catch (err) {
    next(err)
  }
})

router.get('/:developerId/projects', async (req, res, next) => {
  try {
    const developerProjects = await Developer.findOne({
      where: {id: req.params.developerId},
      include: [{model: Client}]
    })
    res.json(developerProjects)
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  const {email} = req.body
  try {
    const result = await Developer.create({email})
    res.json(result)
  } catch (err) {
    next(err)
  }
})
