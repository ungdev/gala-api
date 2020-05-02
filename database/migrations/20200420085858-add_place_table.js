'use strict';

module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable("Places", {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      start: {
        type: DataTypes.DATE,
        allowNull: false
      },
      end: {
        type: DataTypes.DATE,
        allowNull: false
      },
      placeType: {
        type: DataTypes.ENUM('EAT', 'stage', 'food', 'rechargement', 'prevention', 'entry', 'animation', 'aidStation', 'cloakroom', 'other'),
        allowNull: false
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: ''
      },
      visible: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
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
    return queryInterface.dropTable("Places");
  }
};
