"use strict";

module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.addColumn("Artists", "index", {
      type: DataTypes.INTEGER,
      allowNull: false
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn("Artists", "index");
  }
};
