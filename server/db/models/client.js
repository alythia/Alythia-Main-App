const Sequelize = require('sequelize')
const db = require('../db')

const Client = db.define('client', {
  projectName: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {notEmpty: true}
  },

  projectID: {
    type: Sequelize.STRING // Auto-generates
  },

  url: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      isUrl: true
    }
  },

  ApiToken: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4 // Auto-generates
  }
})

// Auto-generates project ID
Client.afterCreate(function(client) {
  client.projectID = `${client.projectName.split(' ').join('-')}-${client.id}`
  client.save()
})

module.exports = Client
