const { DataTypes } = require("sequelize");
const sequelize = require("../utils/connection");

const Genre = sequelize.define("genres", {
  genreName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

//* Genre <-> Movie

module.exports = Genre;
