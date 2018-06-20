// const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')

const User = db.define('user', {
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  active: {
    type: Sequelize.BOOLEAN,
    defaultValue: 'false'
  }
})

module.exports = User

/**
 * instanceMethods
 */
// User.prototype.correctPassword = function(candidatePwd) {
//   return User.encryptPassword(candidatePwd, this.salt()) === this.password()
// }

/**
 * classMethods
 */

/**
 * hooks
 */
