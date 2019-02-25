module.exports = function(sequelize) {
  const Partner = sequelize.import(`${__dirname}/partner`)
  const Event = sequelize.import(`${__dirname}/event`)

  return {
    Partner,
    Event
  }
}
