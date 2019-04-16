module.exports = function(sequelize) {
  const Partner = sequelize.import(`${__dirname}/partner`)
  const Message = sequelize.import(`${__dirname}/message`)
  const Censored = sequelize.import(`${__dirname}/censored`)
  const Tweet = sequelize.import(`${__dirname}/tweet`)
  const Event = sequelize.import(`${__dirname}/event`)
  const Artist = sequelize.import(`${__dirname}/artist`)
  const User = sequelize.import(`${__dirname}/user`)
  const Permission = sequelize.import(`${__dirname}/permission`)

  Event.belongsTo(Artist)
  Artist.hasMany(Event)

  Event.belongsTo(Partner)
  Partner.hasMany(Event)

  Permission.belongsTo(User)
  User.hasMany(Permission)

  Message.belongsTo(User)
  User.hasMany(Message)

  return {
    Artist,
    Censored,
    Event,
    Message,
    Partner,
    Permission,
    Tweet,
    User
  }
}
