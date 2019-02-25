module.exports = function(sequelize) {
  const Partner = sequelize.import(`${__dirname}/partner`)
  const Event = sequelize.import(`${__dirname}/event`)
  const Image = sequelize.import(`${__dirname}/image`)

  return {
    Partner,
    Event,
    Image
  }
}
