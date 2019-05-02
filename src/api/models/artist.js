module.exports = (sequelize, DataTypes) => {
  return sequelize.define('artist', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
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
    },
    visible: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    index: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  })
}
