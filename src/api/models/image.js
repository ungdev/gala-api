module.exports = (sequelize, DataTypes) => {
  return sequelize.define('image', {
    url: {
      type: DataTypes.STRING
    },
    visible: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  })
}
