module.exports = function(sequelize) {
  const Partner = sequelize.import(`${__dirname}/partner`)
  const Event = sequelize.import(`${__dirname}/event`)
  const Image = sequelize.import(`${__dirname}/image`)
  const Artist = sequelize.import(`${__dirname}/artist`)

  Event.hasOne(Artist)
  Artist.belongsTo(Event)

  return {
    Partner,
    Event,
    Image,
    Artist
  }
}
