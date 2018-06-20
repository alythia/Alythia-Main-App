const Developer = require('./developer')
const Client = require('./client')

Developer.belongsToMany(Client, {through: 'relationship'})
Client.belongsToMany(Developer, {through: 'relationship'})

module.exports = {
  Developer,
  Client
}
