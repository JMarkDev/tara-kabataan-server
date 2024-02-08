const sequelize = require('../configs/database')
const { DataTypes } = require('sequelize')

const Archives = sequelize.define('archives', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    event_id: {
        type: DataTypes.STRING(55),
        allowNull: false
    },
    event_title: {
        type: DataTypes.STRING(250),
        allowNull: false
    },
    images: {
        type: DataTypes.STRING(455),
        allowNull: true
    },
    status: {
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
}, {
    timestamps: false
})

module.exports = Archives