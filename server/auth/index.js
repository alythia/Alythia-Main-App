const router = require('express').Router()
const Developer = require('../db/models/developer')
module.exports = router

router.post('/login', async (req, res, next) => {
  const developer = await Developer.findOne({where: {email: req.body.email}})
  if (!developer) {
    console.log('No such developer found:', req.body.email)
    res.status(401).send('Wrong username and/or password')
  } else if (!developer.correctPassword(req.body.password)) {
    console.log('Incorrect password for developer:', req.body.email)
    res.status(401).send('Wrong username and/or password')
  } else {
    req.login(developer, err => (err ? next(err) : res.json(developer)))
  }
})

router.post('/signup', async (req, res, next) => {
  try {
    const developer = await Developer.create(req.body)
    req.login(developer, err => (err ? next(err) : res.json(developer)))
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('Developer already exists')
    } else {
      next(err)
    }
  }
})

router.post('/logout', (req, res) => {
  req.logout()
  req.session.destroy()
  res.redirect('/')
})

router.get('/me', (req, res) => {
  res.json(req.user)
})

router.use('/google', require('./google'))
router.use('/alythia', require('./alythia'))

