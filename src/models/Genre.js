const { DataTypes } = require("sequelize");
const sequelize = require("../utils/connection");

const Genre = sequelize.define("genre", {
  genreName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

//* Genre <-> Movie

module.exports = Genre;
