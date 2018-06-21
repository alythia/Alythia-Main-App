const crypto = require('crypto')
const db = require('../db')
const Sequelize = require('sequelize')

const Client = db.define('client', {
  projectName: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {notEmpty: true}
  },
  website: {
    type: Sequelize.STRING,
    allowNull: false,
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
  APItoken: {
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
