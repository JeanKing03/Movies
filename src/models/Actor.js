const { DataTypes } = require("sequelize");
const sequelize = require("../utils/connection");

const Actor = sequelize.define("actors", {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  nationality: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  birthDay: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
});

//* Actor <-> Movie

module.exports = Actor;
