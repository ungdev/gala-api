module.exports = (sequelize, DataTypes) => {
  return sequelize.define('event', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    start: {
      type: DataTypes.DATE
    },
    end: {
      type: DataTypes.DATE
    },
    place: {
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.STRING
    },
    artist: {
      type: DataTypes.STRING
    },
    artistLink: {
      type: DataTypes.STRING
    },
    image: {
      type: DataTypes.STRING
    },
    visible: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  })
}
