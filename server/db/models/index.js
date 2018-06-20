const User = require('./user')
const Client = require('./client')

User.belongsToMany(Client, {through: 'relationship'})
Client.belongsToMany(User, {through: 'relationship'})

module.exports = {
  User,
  Client
}
