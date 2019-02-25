module.exports = (sequelize, DataTypes) => {
  return sequelize.define('partner', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    image: {
      type: DataTypes.STRING
    },
    url: {
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.STRING
    },
    visible: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  })
}
