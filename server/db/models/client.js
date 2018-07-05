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
    validate: {
      isUrl: true
    }
  },
  client_id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV1
  },
  secret_key: {
    type: Sequelize.STRING,
    unique: true
  },
  public_key: {
    type: Sequelize.STRING,
    unique: true
  }
})

module.exports = Client

const generateSecretKey = () => {
  return crypto.randomBytes(16).toString('base64')
}

const generatePublicKey = () => {
  return crypto.randomBytes(32).toString('base64')
}

const generateToken = client => {
  client.secret_key = generateSecretKey()
  client.public_key = generatePublicKey()
}

Client.beforeCreate(generateToken)
