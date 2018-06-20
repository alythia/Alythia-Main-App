const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')

const Developer = db.define('developer', {
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    // Making `.password` act like a func hides it when serializing to JSON.
    // This is a hack to get around Sequelize's lack of a "private" option.
    get() {
      return () => this.getDataValue('password')
    }
  },
  salt: {
    type: Sequelize.STRING,
    // Making `.salt` act like a function hides it when serializing to JSON.
    // This is a hack to get around Sequelize's lack of a "private" option.
    get() {
      return () => this.getDataValue('salt')
    }
  },
  googleId: {
    type: Sequelize.STRING
  }
})

module.exports = Developer

/**
 * instanceMethods
 */
Developer.prototype.correctPassword = function(candidatePwd) {
  return (
    Developer.encryptPassword(candidatePwd, this.salt()) === this.password()
  )
}

/**
 * classMethods
 */
Developer.generateSalt = function() {
  return crypto.randomBytes(16).toString('base64')
}

Developer.encryptPassword = function(plainText, salt) {
  return crypto
    .createHash('RSA-SHA256')
    .update(plainText)
    .update(salt)
    .digest('hex')
}

/**
 * hooks
 */
const setSaltAndPassword = developer => {
  if (developer.changed('password')) {
    developer.salt = Developer.generateSalt()
    developer.password = Developer.encryptPassword(
      developer.password(),
      developer.salt()
    )
  }
}

Developer.beforeCreate(setSaltAndPassword)
Developer.beforeUpdate(setSaltAndPassword)
