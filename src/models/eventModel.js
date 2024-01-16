const sequelize = require("../configs/database");
const { DataTypes } = require("sequelize");

const Events = sequelize.define("events" , {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    event_title: {
        type: DataTypes.STRING(250),
        allowNull: false
    },
    event_description: {
        type: DataTypes.STRING(250),
        allowNull: false
    },
    start_date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    end_date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    time: {
        type: DataTypes.TIME,
        allowNull: false
    }, 
    location: {
        type: DataTypes.STRING(255),
        allowNull: false
    }, 
    organizer_name: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    organizer_email: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    max_attendees: {
        type: DataTypes.NUMBER,
        allowNull: false
    },
    is_publish: {   
        type: DataTypes.STRING(55),
        allowNull: true
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false
    }, 
    updated_at: {
        type: DataTypes.DATE,
        allowNull: true
    }
});

module.exports = Events