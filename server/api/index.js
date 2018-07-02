const router = require('express').Router()

module.exports = router

router.use('/developers', require('./developers'))
router.use('/users', require('./users'))
router.use('/clients', require('./clients'))

router.get('/test-qr', (req, res, next) => {
  const {io} = require('../../server/index')
  io.emit('Hello')
  res.send('Testing successful for GET request')
})

router.post('/test-qr', (req, res, next) => {
  console.log('BODY CONTAINS', req.body)
  res.send('Testing successful for POST request')
})

router.use((req, res, next) => {
  console.log(req.body)
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
