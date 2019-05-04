'use strict';
module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('UserLocations',
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        UserId: {
          type: Sequelize.INTEGER,
          references: {
            model: 'Users',
            key: 'id'
          },
          allowNull: false
        },
        LocationId: {
          type: Sequelize.INTEGER,
          references: {
            model: 'Locations',
            key: 'id'
          },
          allowNull: false
        },
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE,
      }
  )},
down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('UserLocations')
  }
};
