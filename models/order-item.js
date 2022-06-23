const Sequelize = require("sequelize");

const sequeslize = require("../util/database");

const OrderItem = sequeslize.define("OrderItem", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

module.exports = OrderItem;
