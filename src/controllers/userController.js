const userModel = require('../models/userModel');
const otpModel = require('../models/otpModel')
const { Op } = require("sequelize");
const bcrypt = require('bcryptjs')
const saltRounds = 10
const sequelize = require('../configs/database')
const date = require('date-and-time');
const otpController = require('../controllers/otpController')
const { successRegistrationEmail } = require('../utils/successRegistrationEmail')

// const User = require('../models/userModel');

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
        return res.status(200).json({status: 'success', message: 'User deleted successfully'})
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

        return res.status(200).json(filtedUsers)
    } catch (error) {
        console.error(error)
        return res.status(500).json({Error: 'Filter users error in server'})
    }
}

const updateUser = async (req, res) => {
    const { id } = req.params
    const { firstname, lastname, email, gender, password } = req.body

    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds)
        const updatedAt = new Date();
        const formattedDate = date.format(updatedAt, 'YYYY-MM-DD HH:mm:ss');

        const updateUser = await userModel.update(
            {
                firstname: firstname,
                lastname: lastname,
                email: email,
                gender: gender,
                password: hashedPassword,
                updatedAt: sequelize.literal(`'${formattedDate}'`)
            }, {
                where: {
                    id: id
                }
            }
        )

        return res.status(200).json({
            updateUser,
            status: 'success',
            message: 'Updated Successfully'
        })
    } catch (error) {
        return res.status(500).json({Error: 'Update user error'})
    }
}

const updateUsername = async (req, res) => {
    const { email } = req.body
    try {
        const emailExist = await userModel.findOne({
            where: {
                email: email,
                status: 'Verified'
            }
        })
        console.log(emailExist)

        if(emailExist) {
            return res.status(409).json({ 
                status: 'error',
                message: 'Email has already been taken, please try another email.'
            })
        } else {
            const createdOTP = await otpController.postOtp(email)
            return res.status(200).json({
                status: 'success',
                message: `Verification sent to ${email}`,
                createdOTP
            })
        }
    } catch (error) {
        console.error(error)
        return res.status(500).json({Error: 'Update email error'})
    }
}

const verifyOTP = async (req, res) => {
    const { id } = req.params
    const { email, otp } = req.body
    try {
        const matchOTPRecord = await otpModel.findOne({ where: { email: email } })

        let expiresAt; 

        if (!matchOTPRecord) {
            return res.status(400).json({ 
                status: 'error', 
                message: 'OTP not found. Please request a new code and try again.' 
            });
        } else {
            expiresAt = matchOTPRecord.expiresAt
        }
        
        if(expiresAt < Date.now()){
            return res.status(400).json({
                status: 'error',
                message: "Code has expired. Request a new one"
            })
        }
        
        const matchOTP = await bcrypt.compare(otp, matchOTPRecord.otp)
        if(matchOTP && expiresAt > Date.now()) {
            const updateUsername = await userModel.update(
                {
                    email: email 
                }, {
                    where: {
                        id: id
                    }
                })

            await otpModel.destroy({
                where: {
                    email: email
                }
            })

            await successRegistrationEmail({
                email: email,
                subject: "Email Updated Successfully", 
                message: "Congratulations! Your email has been updated successfully."
            })
            
            return res.status(200).json({
                status: 'success',
                message: 'Email Updated Successfully',
                updateUsername
            })
        } else {
            return res.status(400).json({
                status: "error",
                message: "Invalid OTP. Please try again."
            });
        }
        
    } catch (error) {
        console.error(error)
        return res.status(500).json({Error: 'Update email verify OTP error'})
    }
} 

module.exports = {
    getUserById,
    getAllUsers,
    getUserByRole,
    deleteUser,
    searchUsers,
    filterByGender,
    updateUser,
    updateUsername,
    verifyOTP
}