const sequelize = require("../configs/database");
const { DataTypes } = require("sequelize");

const Events = sequelize.define(
  "events",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    event_title: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
    event_description: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
    event_category: {
      type: DataTypes.STRING(55),
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    start_time: {
      type: DataTypes.STRING(55),
      allowNull: false,
    },
    end_time: {
      type: DataTypes.STRING(55),
      allowNull: false,
    },
    start_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    end_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    organizer_name: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    // attendance_count: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    // },
    event_type: {
      type: DataTypes.STRING(55),
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER(10, 2),
      allowNull: true,
    },
    discount: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING(55),
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: true,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    timestamps: false, // disable createdAt and updatedAt
    timeZone: "+08:00", // set timezone to UTC+8
  }
);

module.exports = Events;
