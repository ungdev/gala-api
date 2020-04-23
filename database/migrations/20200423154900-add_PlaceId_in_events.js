'use strict';

module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.addColumn("Events", "PlaceId", {
      type: DataTypes.UUID,
      references: {
        model: "Places",
        key: "id"
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
      allowNull: true
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn("Events", "PlaceId");
  }
};
