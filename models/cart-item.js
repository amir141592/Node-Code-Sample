const Sequelize = require('sequelize')

const sequeslize = require('../util/database');

const CartItem = sequeslize.define('CartItem', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
  }
})

module.exports = CartItem;