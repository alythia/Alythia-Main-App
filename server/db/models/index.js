const Developer = require('./developer')
const Client = require('./client')
const User = require('./user')

User.belongsToMany(Client, {through: 'relationship'})
Client.belongsToMany(User, {through: 'relationship'})

Developer.hasMany(Client)
Client.belongsTo(Developer)

module.exports = {
  Developer,
  Client,
  User
}
