const crypto = require('crypto')
const db = require('../db')
const Sequelize = require('sequelize')

const Client = db.define('client', {
  appName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  website: {
    type: Sequelize.STRING,
    get() {
      return () => this.getDataValue('website')
    }
  },
  salt: {
    type: Sequelize.STRING,
    get() {
      return () => this.getDataValue('salt')
    }
  },
  token: {
    type: Sequelize.STRING
  }
})

module.exports = Client

Client.generateSalt = function() {
  return crypto.randomBytes(16).toString('base64')
}

Client.generateHash = function(plainText, salt) {
  return crypto
    .createHash('RSA-SHA256')
    .update(plainText)
    .update(salt)
    .digest('hex')
}

const generateToken = client => {
  client.salt = Client.generateSalt()
  client.token = Client.generateHash(client.website(), client.salt())
}

Client.beforeCreate(generateToken)
