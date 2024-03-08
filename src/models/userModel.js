const sequelize = require("../configs/database");
const { DataTypes } = require("sequelize");

const User = sequelize.define(
  "users",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING(250),
      allowNull: true,
    },
    firstname: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    lastname: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    gender: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    birthdate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    location: {
      type: DataTypes.STRING(250),
      allowNull: true,
    },
    phone_number: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = User;
