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
    image: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    event_type: {
        type: DataTypes.STRING(250),
        allowNull: false
    },
    start_time: {
        type: DataTypes.STRING(55),
        allowNull: false
    },
    end_time: {
        type: DataTypes.STRING(55),
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
    location: {
        type: DataTypes.STRING(255),
        allowNull: false
    }, 
    organizer_name: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    max_attendees: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    // is_publish: {   
    //     type: DataTypes.STRING(55),
    //     allowNull: true
    // },
    is_paid: {
        type: DataTypes.STRING(55),
        allowNull: false
    },
    price: {
        type: DataTypes.INTEGER(10, 2),
        allowNull: true
    },
    discount: {
        type: DataTypes.INTEGER(10, 2),
        allowNull: true
   
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: true,
    },    
    updated_at: {
        type: DataTypes.DATE,
        allowNull: true
    },
}, {
    timestamps: false,  // disable createdAt and updatedAt
    timeZone: '+08:00', // set timezone to UTC+8
});

module.exports = Events