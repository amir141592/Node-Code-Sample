const Sequelize = require('sequelize');

const sequeslize = require('../util/database');

const Cart = sequeslize.define('Cart', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  }
})

module.exports = Cart;