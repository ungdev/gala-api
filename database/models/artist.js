module.exports = (sequelize, DataTypes) => {
  const Artist = sequelize.define("Artist", {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
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
    visible: { type: DataTypes.BOOLEAN, defaultValue: true }
  });
  Artist.associate = models => {
    const { Event } = models;
    Event.belongsTo(Artist);
    Artist.hasMany(Event);
  };
  return Artist;
};
