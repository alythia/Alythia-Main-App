const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')

const User = db.define('user', {
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  UUID: {
    type: Sequelize.STRING,
    // Making `.UUID` act like a func hides it when serializing to JSON.
    // This is a hack to get around Sequelize's lack of a "private" option.
    get() {
      return () => this.getDataValue('UUID')
    }
  },
  salt: {
    type: Sequelize.STRING,
    // Making `.salt` act like a function hides it when serializing to JSON.
    // This is a hack to get around Sequelize's lack of a "private" option.
    get() {
      return () => this.getDataValue('salt')
    }
  }
})

module.exports = User

/**
 * instanceMethods
 */
User.prototype.correctUUID = function(candidateUUID) {
  return User.encryptUUID(candidateUUID, this.salt()) === this.UUID()
}

/**
 * classMethods
 */
User.generateSalt = function() {
  return crypto.randomBytes(16).toString('base64')
}

User.encryptUUID = function(plainText, salt) {
  return crypto
    .createHash('RSA-SHA256')
    .update(plainText)
    .update(salt)
    .digest('hex')
}

/**
 * hooks
 */
const setSaltAndUUID = user => {
  if (user.changed('UUID')) {
    user.salt = User.generateSalt()
    user.UUID = User.encryptUUID(user.UUID(), user.salt())
  }
}

User.beforeCreate(setSaltAndUUID)
User.beforeUpdate(setSaltAndUUID)
