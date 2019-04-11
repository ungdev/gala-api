module.exports = function(sequelize) {
  const Partner = sequelize.import(`${__dirname}/partner`)
  const Message = sequelize.import(`${__dirname}/message`)
  const Event = sequelize.import(`${__dirname}/event`)
  const Artist = sequelize.import(`${__dirname}/artist`)
  const User = sequelize.import(`${__dirname}/user`)
  const Permission = sequelize.import(`${__dirname}/permission`)

  Event.belongsTo(Artist)
  Artist.hasMany(Event)

  Permission.belongsTo(User)
  User.hasMany(Permission)

  Message.belongsTo(User)
  User.hasMany(Message)

  return {
    Artist,
    Event,
    Message,
    Partner,
    Permission,
    User
  }
}
