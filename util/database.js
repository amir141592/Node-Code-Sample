const Sequelize = require("sequelize");

const sequelize = new Sequelize("test", "root", "aa141592", { dialect: "mysql" });

module.exports = sequelize;
