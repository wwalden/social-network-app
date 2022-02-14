const Sequelize = require("sequelize");
const sequelize = require('../database/connection');

module.exports = sequelize.define("Like", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER(11),
    },
    messid: {
      allowNull: false,
      type: Sequelize.INTEGER(11),
    },
    userid: {
      allowNull: false,
      type: Sequelize.INTEGER(11),
    },
});