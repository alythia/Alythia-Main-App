const crypto = require('crypto')
const db = require('../db')
const Sequelize = require('sequelize')
const jwt = require('jsonwebtoken')

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
  secret: {
    type: Sequelize.STRING,
    unique: true,
    get() {
      return () => this.getDataValue('secret')
    }
  },
  APItoken: {
    type: Sequelize.STRING
  }
})

module.exports = Client

Client.generateSecret = function() {
  return crypto.randomBytes(16).toString('base64')
}

Client.generateHash = function(plainText, secret) {
  return jwt.sign({url: plainText}, secret)
}

const generateToken = client => {
  client.secret = Client.generateSecret()
  client.APItoken = Client.generateHash(client.website(), client.secret())
}

Client.beforeCreate(generateToken)
