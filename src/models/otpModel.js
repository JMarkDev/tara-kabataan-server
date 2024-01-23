const sequelize = require("../configs/database");
const { DataTypes } = require("sequelize");

const Otp = sequelize.define("otp", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    otp: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false
    },
    expiresAt: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    tableName: 'otp',
    freezeTableName: true,
    timestamps: false, // Disable timestamps
});

module.exports = Otp;
