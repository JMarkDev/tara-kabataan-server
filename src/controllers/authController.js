const adminModel = require('../models/adminModel')
const userModel = require('../models/userModel')
const otpController = require('./otpController')
const date = require('date-and-time')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const saltRounds = 10;
const sequelize = require('../configs/database');
const { v4: uuidv4 } = require('uuid');

const handleRegister = async (req, res) => {
    const userId = uuidv4();
    const { firstname, lastname, email, role, gender, password, status } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const verifiedUser = await userModel.count({
            where: {
                email: email,
                status: 'verified'
            }
        })

        if (verifiedUser) {
            return res.status(400).json({ 
                status: "error", 
                message: "Username already taken. Try another one." 
              });
        } else {
             await userModel.destroy({
                where: {
                    email: email,
                    status: 'pending'
                }
            })

            const created_at = new Date()
            const formattedDate = date.format(created_at, 'YYYY-MM-DD HH:mm:ss') ; 

            const sendOTP = await otpController.postOtp(email)
            await userModel.create({
                id: userId,
                firstname: firstname,
                lastname: lastname,
                email: email, 
                role: role, 
                gender: gender, 
                password: hashedPassword, 
                status: 'pending', 
                createdAt: sequelize.literal(`'${formattedDate}'`),
            })

            return res.status(200).json({ 
                status: "success",
                message: `Verification OTP sent to ${email}.`, 
                sendOTP
              });
        }
    } catch (error) {
        console.error(error)
        return res.status(500).json({Error: 'Register error in server'})
    }
}

const handleLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await userModel.findOne({
            where: {
                email: email
            }
        })

        const verifiedUser = await userModel.count({
            where: {
                email: email,
                status: 'verified'
            }
        });

        if (user && verifiedUser) {
            const passwordMatch = await bcrypt.compare(password, user.password);

            if (passwordMatch) {
                const token = jwt.sign({
                    id: user.id,
                    email: user.email,
                    role: user.role,
                    userId: user.id
                }, process.env.SECRET_KEY, {
                    expiresIn: '1d'
                });

                // Set a secure HTTP-only cookie
                res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });


                return res.status(200).json({
                    status: "success",
                    message: "Login successful",
                    role: user.role,
                    token: token,
                    userId: user.id
                })
            } else {
                return res.status(400).json({
                    status: "error",
                    message: "Incorrect password"
                })
            }
        } else {
            return res.status(400).json({
                status: "error",
                message: "Invalid username or password!"
            })
        }
    } catch (error) {
        console.error(error)
        return res.status(500).json({Error: 'Login error in server'})
    }
}

module.exports = {
    handleRegister,
    handleLogin
}