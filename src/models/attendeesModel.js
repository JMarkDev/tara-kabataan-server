const sequelize = require("../configs/database");
const { DataTypes } = require("sequelize");
const User = require("./userModel");

const Attendees = sequelize.define(
  "attendees",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users", // Name of the referenced table
        key: "id", // Name of the referenced column
      },
    },
    event_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    event_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    event_location: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    event_date: {
      type: DataTypes.STRING(55),
      allowNull: false,
    },
    attendee_name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    gender: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    attendee_email: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    registration_time: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    payment_method: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    event_type: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    total_amount: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    timestamps: false,
    timeZone: "+08:00",
  }
);

Attendees.belongsTo(User, { foreignKey: "user_id" });

module.exports = Attendees;
