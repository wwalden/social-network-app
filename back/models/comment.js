const Sequelize = require("sequelize");
const sequelize = require('../database/connection');

module.exports = sequelize.define("Comment", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER(11),
    },
    messageid: {
      allowNull: false,
      type: Sequelize.INTEGER(11),
    },
    userid: {
      allowNull: false,
      type: Sequelize.INTEGER(11),
    },
    content: {
      allowNull: false,
      type: Sequelize.INTEGER(11),
    }
});