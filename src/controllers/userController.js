const userModel = require('../models/userModel');
const { Op } = require("sequelize");

const getUserById = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await userModel.findByPk(id);
        if (!user) {
            return res.status(404).json({Error: 'User not found'})
        }
        return res.status(200).json(user)
    } catch (error) {
        console.error(error)
        return res.status(500).json({Error: 'Get user error in server'})
    }
}

const getAllUsers = async (req, res) => {
    try {
        const users = await userModel.findAll();
        return res.status(200).json(users)
    } catch (error) {
        console.error(error)
        return res.status(500).json({Error: 'Get all users error in server'})
    }
}

const deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await userModel.findByPk(id);
        if (!user) {
            return res.status(404).json({Error: 'User not found'})
        }
        await user.destroy();
        return res.status(200).json({Message: 'User deleted'})
    } catch (error) {
        console.error(error)
        return res.status(500).json({Error: 'Delete user error in server'})
    }
}

const searchUsers = async (req, res) => {
    const { name, role } = req.params;
    console.log(name, role)

    try {
        const searchCriteria = {
            where: {
                firstname: { [Op.like]: `%${name}%` }, // Use LIKE for partial matches
                status: 'verified',
                role: role
            },
        }

        const users = await userModel.findAll(searchCriteria);
        console.log(users)

        if(users.length > 0) {
            return res.status(200).json(users)
        } else {
            return res.status(404).json({Error: 'No users found'})
        }

    } catch (error) {
        console.error(error)
        return res.status(500).json({Error: 'Search users error in server'})
    }
}

module.exports = {
    getUserById,
    getAllUsers,
    deleteUser,
    searchUsers
}