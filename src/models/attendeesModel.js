const sequelize = require("../configs/database");
const { DataTypes } = require("sequelize");

const Attendees = sequelize.define("attendees" , {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    event_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    attendee_name: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    attendee_email: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    phone_number: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    gender: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    registration_time: {
        type: DataTypes.DATE,
        allowNull: false
    },
    location: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    payment_amount: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    payment_discount: {
        type: DataTypes.INTEGER,
        allowNull: true
    },  
    status: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false
    },
    updated_at: {
        type: DataTypes.DATE
    },
});

module.exports = Attendees;