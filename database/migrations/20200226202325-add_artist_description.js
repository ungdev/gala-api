"use strict";

module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.addColumn("Artists", "description", {
      type: DataTypes.TEXT
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn("Artists", "description");
  }
};
