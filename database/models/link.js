module.exports = (sequelize, DataTypes) => {
  const Link = sequelize.define("Link", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    uri: {
      type: DataTypes.STRING,
      allowNull: false
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  Link.associate = models => {
    Link.belongsTo(models.Artist);
    models.Artist.hasMany(Link);
  };
  return Link;
};
