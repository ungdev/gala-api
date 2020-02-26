"use strict";

module.exports = {
  up: queryInterface => {
    return queryInterface.removeColumn("Artists", "link");
  },

  down: (queryInterface, DataTypes) => {
    return queryInterface.addColumn("Artists", "link", {
      type: DataTypes.STRING,
      allowNull: true
    });
  }
};
