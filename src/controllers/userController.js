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
        const verifiedUsers = await userModel.findAll({
            where: {
                status: 'verified'
            }
        })

        return res.status(200).json(verifiedUsers)
    } catch (error) {
        console.error(error)
        return res.status(500).json({Error: 'Get all users error in server'})
    }
}

const getUserByRole = async (req, res) => {
    const { role } = req.params;

    try {
        const users = await userModel.findAll({
            where: {
                role: role,
                status: 'verified'
            }
        });
        return res.status(200).json(users)
    } catch (error) {
        console.error(error)
        return res.status(500).json({Error: 'Get user by role error in server'})
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

    try {
        const searchCriteria = {
            where: {
                firstname: { [Op.like]: `${name}%` }, // Use LIKE for partial matches
                status: 'verified',
                role: role
            },
        }

        const users = await userModel.findAll(searchCriteria);
        return res.status(200).json(users)
    } catch (error) {
        console.error(error)
        return res.status(500).json({Error: 'Search users error in server'})
    }
}

const filterByGender = async (req, res) => {
    const { gender, role } = req.params;

    try {
        const filtedUsers = await userModel.findAll({
            where: {
                role: role,
                status: 'verified',
                gender: gender
            }
        })

        console.log(filtedUsers)

        return res.status(200).json(filtedUsers)
    } catch (error) {
        console.error(error)
        return res.status(500).json({Error: 'Filter users error in server'})
    }
}

module.exports = {
    getUserById,
    getAllUsers,
    getUserByRole,
    deleteUser,
    searchUsers,
    filterByGender
}