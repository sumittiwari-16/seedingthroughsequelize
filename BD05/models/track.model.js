let { DataTypes, sequelize } = require('../lib/');

let track = sequelize.define('track', {
  title: DataTypes.TEXT,
  director: DataTypes.TEXT,
  genre: DataTypes.TEXT,
  release_year: DataTypes.INTEGER,
  rating: DataTypes.INTEGER,
  actor: DataTypes.TEXT,
  box_office_collection: DataTypes.INTEGER,
});

module.exports = {
  track,
};
