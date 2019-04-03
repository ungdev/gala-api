module.exports = function(sequelize) {
  const Partner = sequelize.import(`${__dirname}/partner`)
  const Event = sequelize.import(`${__dirname}/event`)
  const Image = sequelize.import(`${__dirname}/image`)
  const Artist = sequelize.import(`${__dirname}/artist`)
  const User = sequelize.import(`${__dirname}/user`)
  const Permission = sequelize.import(`${__dirname}/permission`)

  Event.belongsTo(Artist)
  Artist.hasMany(Event)

  Permission.belongsTo(User)
  User.hasMany(Permission)

  return {
    Artist,
    Event,
    Image,
    Partner,
    Permission,
    User
  }
}
