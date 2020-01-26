"use strict";
const moment = require("moment");

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Permissions",
      [
        {
          id: "1",
          name: "admin",
          createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
          updatedAt: moment().format('YYYY-MM-DD HH:mm:ss')
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Permissions", null, {});
  }
};
