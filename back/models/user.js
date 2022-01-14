const Sequelize = require("sequelize");
const sequelize = require('../database/connection');

module.exports = sequelize.define("User", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER(11),
    },
    email: {
      allowNull: false,
      type: Sequelize.STRING(255),
    },
    username: {
      allowNull: false,
      unique: true,
      type: Sequelize.STRING(255),
    },
    password: {
      allowNull: false,
      type: Sequelize.STRING(255),
    },
    bio: {
      allowNull: true,
      type: Sequelize.STRING(1024),
    },
    isAdmin: {
      allowNull: false,
      type: Sequelize.BOOLEAN,
    }
});


/*
User.hasMany(Message, {foreignKey: 'userId'});
Message.belongsTo(User, {foreignKey: 'userId'})
*/

