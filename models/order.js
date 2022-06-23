const Sequelize = require("sequelize");

const sequeslize = require("../util/database");

const Order = sequeslize.define("Order", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
});

module.exports = Order;
