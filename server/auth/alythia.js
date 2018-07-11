const passport = require('passport')
const router = require('express').Router()
const passportCustom = require('passport-custom');
const CustomStrategy = passportCustom.Strategy;
const { Developer } = require('../db/models')
module.exports = router

passport.use('alythia', new CustomStrategy(
  function(req, done) {
    Developer.find({ where: { googleId: req.params.id} })
      .then(
        foundDeveloper =>
          foundDeveloper
            ? done(null, foundDeveloper)
            : Developer.create({
                email: req.body.email,
                googleId: req.params.id,
              }).then(createdDeveloper => done(null, createdDeveloper))
      )
      .catch(done)
  }
));

router.post('/verify/:id', passport.authenticate('alythia'))

router.get('/logged-in/:id',
  passport.authenticate('alythia', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  }
);
