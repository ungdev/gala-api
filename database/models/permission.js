module.exports = (sequelize, DataTypes) => {
  const Permission = sequelize.define("Permission", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  Permission.associate = models => {
    const { User } = models;
    Permission.belongsTo(User);
    User.hasMany(Permission);
  };
  return Permission;
};
