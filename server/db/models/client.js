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
  },
  client_id:{
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV1
  },
  secret_key: {
    type: Sequelize.STRING,
    unique: true,
  },
  public_key: {
    type: Sequelize.STRING,
    unique: true
  }
})

module.exports = Client

Client.generateSecretKey = function() {
  return crypto.randomBytes(16).toString('base64')
}

Client.generatePublicKey = function() {
  return crypto.randomBytes(32).toString('base64')
}

const generateToken = client => {
  client.secret_key = Client.generateSecretKey()
  client.public_key = Client.generatePublicKey()
}

Client.beforeCreate(generateToken)
