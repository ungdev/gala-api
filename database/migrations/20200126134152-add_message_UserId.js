"use strict";

module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.addColumn("Messages", "UserId", {
      type: DataTypes.UUID,
      references: {
        model: "Users",
        key: "id"
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL"
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn("Messages", "UserId");
  }
};
