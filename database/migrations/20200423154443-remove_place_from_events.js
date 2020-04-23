'use strict';

module.exports = {
  up: queryInterface => {
    return queryInterface.removeColumn("Events", "place");
  },

  down: (queryInterface, DataTypes) => {
    return queryInterface.addColumn("Events", "place", {
      type: DataTypes.STRING,
      allowNull: false
    });
  }
};
