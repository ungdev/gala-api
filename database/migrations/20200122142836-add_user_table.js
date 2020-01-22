"use strict";

module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable("Users", {
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
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable("Users");
  }
};
