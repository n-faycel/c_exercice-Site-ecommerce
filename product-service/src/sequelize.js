const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize("products_db", "postgres", "password", {
  host: "db",
  dialect: "postgres",
});

const Product = sequelize.define('Product', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  }
});


module.exports = {sequelize, Product};