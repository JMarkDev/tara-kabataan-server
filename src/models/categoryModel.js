const sequelize = require('../configs/database')
const { DataTypes } = require('sequelize')

const Category = sequelize.define('categories', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    category_name: {
        type: DataTypes.STRING(150),
        allowNull: false
    },
    image: {
        type: DataTypes.STRING(250),
        allowNull: true
    },
    created_at : {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false
    },
    updated_at: {
        type: DataTypes.DATE,
        allowNull: true
    }
}, {
    timestamps: false
})

module.exports = Category