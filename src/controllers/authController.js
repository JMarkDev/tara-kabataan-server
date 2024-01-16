const adminModel = require('../models/adminModel')
const userModel = require('../models/userModel')
const otpController = require('./otpController')
const date = require('date-and-time')
const bcrypt = require('bcryptjs')
const saltRounds = 10;

const handleRegister = async (req, res) => {
    const { firstname, lastname, email, role, gender, password, status } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const verifiedUser = await userModel.count({
            where: {
                email: email,
                status: 'verified'
            }
        })

        if (verifiedUser.length >= 0 ) {
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

            const sendOTP = await otpController.postOtp(email)
            await userModel.create({
                firstname: firstname,
                lastname: lastname,
                email: email, 
                role: role, 
                gender: gender, 
                password: hashedPassword, 
                status: status, 
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

module.exports = {
    handleRegister
}