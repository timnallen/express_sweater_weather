'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserLocation = sequelize.define('UserLocation', {
  }, {});
  UserLocation.associate = function(models) {
    UserLocation.belongsTo(models.User),
    UserLocation.belongsTo(models.Location)
  };
  return UserLocation;
};
