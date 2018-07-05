const router = require('express').Router()

module.exports = router

router.use('/developers', require('./developers'))
router.use('/users', require('./users'))
router.use('/clients', require('./clients'))

router.use((req, res, next) => {
  console.log(req.body)
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
