module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define("Event", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    start: {
      type: DataTypes.DATE,
      allowNull: false
    },
    end: {
      type: DataTypes.DATE,
      allowNull: false
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    },
    visible: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  });
  Event.associate = models => {
    Event.belongsTo(models.Artist);
    models.Artist.hasMany(Event);
  };
  Event.associate = models => {
    Event.belongsTo(models.Place);
    models.Place.hasMany(Event);
  };
  return Event;
};
