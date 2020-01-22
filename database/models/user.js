module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    full_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    student_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true
    },
    access_token: {
      type: DataTypes.STRING
    },
    refresh_token: {
      type: DataTypes.STRING
    },
    token_expires: {
      type: DataTypes.STRING
    }
  });
  User.associate = models => {
    const { Permission, Message } = models;
    Permission.belongsTo(User);
    User.hasMany(Permission);

    Message.belongsTo(User);
    User.hasMany(Message);
  };
  return User;
};
