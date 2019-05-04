'use strict';
module.exports = (sequelize, DataTypes) => {
  const Location = sequelize.define('Location', {
    location: DataTypes.STRING,
    lat: DataTypes.STRING,
    lng: DataTypes.STRING
  }, {});
  Location.associate = function(models) {
    Location.belongsToMany(models.User, {through: 'UserLocation'});
  };
  return Location;
};
