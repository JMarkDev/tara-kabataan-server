const sequelize = require("../configs/database");
const { DataTypes } = require("sequelize");

const Payment = sequelize.define(
  "payments",
  {
    transaction_id: {
      primaryKey: true,
      type: DataTypes.STRING(155),
      allowNull: true,
    },
    event_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.STRING(55),
      allowNull: false,
    },
    email_address: {
      type: DataTypes.STRING(250),
      allowNull: true,
    },
    amount: {
      type: DataTypes.INTEGER(10, 2),
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING(55),
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    timestamps: false, // disable createdAt and updatedAt
    timeZone: "+08:00", // set timezone to UTC+8
  }
);

module.exports = Payment;
