const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('users_db', 'postgres', 'password', {
    host: 'db',
    dialect: 'postgres'
  });

const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = { sequelize, User };
