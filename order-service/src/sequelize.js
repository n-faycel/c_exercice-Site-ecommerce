const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize("orders_db", "postgres", "password", {
  host: "db",
  dialect: "postgres",
});

const Order = sequelize.define("Order", {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

module.exports = { sequelize, Order };
