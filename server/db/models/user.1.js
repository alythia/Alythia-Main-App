const Sequelize = require('sequelize')
const db = require('../db')

const Client = db.define('client', {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {notEmpty: true}
  },

  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {isEmail: true}
  },

  googleId: {
    type: Sequelize.STRING
  }
})

// Auto-generates project ID
Client.afterCreate(function(client) {
  client.projectID = `${client.projectName.split(' ').join('-')}-${client.id}`
  client.save()
})

module.exports = Client
