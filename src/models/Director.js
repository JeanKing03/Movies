const { DataTypes } = require("sequelize");
const sequelize = require("../utils/connection");

const Director = sequelize.define("directors", {
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

//* Director <-> Movie

module.exports = Director;
