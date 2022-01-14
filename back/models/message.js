const Sequelize = require("sequelize");
const sequelize = require('../database/connection');

module.exports = sequelize.define("Message", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER(11),
    },
    userid: {
      allowNull: false,
      type: Sequelize.INTEGER(11),
    },
    content: {
      allowNull: false,
      type: Sequelize.STRING(1024),
    },
    likes: {
      allowNull: false,
      defaultValue: 0,
      type: Sequelize.INTEGER(11),
    }
});