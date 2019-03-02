module.exports = (sequelize, DataTypes) => {
  return sequelize.define('artist', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true
    },
    link: {
      type: DataTypes.STRING,
      allowNull: true
    }
  })
}
