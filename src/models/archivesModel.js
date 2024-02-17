const sequelize = require('../configs/database')
const { DataTypes } = require('sequelize')

const Archives = sequelize.define('archives', {
    event_id: {
        primaryKey: true,
        type: DataTypes.STRING(55),
        allowNull: false
    },
    event_name : {
        type: DataTypes.STRING(245),
        allowNull: false
    },
    images: {
        type: DataTypes.STRING(1000),
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
}, {
    timestamps: false
})

module.exports = Archives