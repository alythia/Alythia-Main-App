const router = require('express').Router()
const {Developer} = require('../db/models')
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
