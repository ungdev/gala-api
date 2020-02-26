module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Artist', {
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
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    eventDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    eventPlace: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
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
