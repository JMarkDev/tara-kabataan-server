const sequelize = require("../configs/database");
const { DataTypes } = require("sequelize");

const Comments = sequelize.define(
  "event_reviews",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    event_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    event_name: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
    attendees_name: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
    comment: {
      type: DataTypes.STRING(450),
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING(450),
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Comments;
