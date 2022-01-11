const { Sequelize } = require('sequelize');

const sequelize = new Sequelize("socialnetwork", "root", "hMxmLBhxqyGFXXEG9DRC7kpd", {
  host: "127.0.0.1",
  dialect: "mysql"
});

module.exports = sequelize;
global.sequelize = sequelize;
