const userModel = require('../models/userModel')
const otpModel = require('../models/otpModel')
const bcrypt = require('bcryptjs')
const date = require('date-and-time')
const saltRounds = 10
const { sendOTP } = require('../utils/sendOTP')
const { successRegistrationEmail } = require('../utils/successRegistrationEmail')
const sequelize = require('../configs/database')

const changePassController = async (req, res) => {
    const { email } = req.body

    if(!email) {
        return res.status(400).json({ message: 'Email is required' })
    }

    try {
        const emailExist = await userModel.findOne({ where: { email: email } })
        const verifiedUser = await userModel.count({
            where: {
                email: email,
                status: 'verified'
            }
        })

        if( emailExist && verifiedUser) {
            await sendChangePassOTP(email)

            return res.status(200).json({
                status: "success",
                message: `Verification OTP sent to ${email}`
            })    
        } else {
            return res.status(400).json({
                status: "error",
                message: "Email does not exist or is not. Please enter a valid email"
            })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({Error: 'Change password error in server'})
    }
}

const sendChangePassOTP = async (username) => {
    try{
        const createdOTP = await sendOTP({
            email: username,
            subject: "Reset Tara Kabataan password",
            message: "To reset your password, please verify your email with the code below:",
            duration: 5,
        });
        return createdOTP;
    } catch (error) {
        console.log(error)
        throw new Error("Error sending OTP")
    }
}

const confirmOTP = async (req, res) => {
    try {
        const { email, otp } = req.body
        
        if(!otp) {
            return res.status(400).json({
                status: 'error',
                message: 'OTP is required'
            })
        }

        const matchOTPrecord = await otpModel.findOne({
            where: {
                email: email
            }
        })

        const expiresAt = matchOTPrecord.expiresAt

        if(expiresAt < Date.now()){
            return res.status(400).json({
                status: 'error',
                message: "Code has expired. Request a new one"
            })
        }

        const verifyOtpResult = await otpModel.findOne({
            attributes: ['id', 'otp'],
            where: {
                email: email
            }
        })

        if(verifyOtpResult) {
            const matchOTP = await bcrypt.compare(otp, verifyOtpResult.otp);
            if(matchOTP) {
                return res.status(200).json({
                    status: 'success',
                    message: 'OTP verified successfully'
                })
            } else {
                return res.status(400).json({
                    status: 'error',
                    message: 'OTP does not match' 
                })
            }
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({Error: 'Confirm OTP error in server'})
    }
}

const confirmPassword = async (req, res) => {
    try {
        const { email, password } = req.body

        if(!password) {
            return res.status(400).json({
                status: 'error',
                message: 'Password is required'
            })
        }

        const updatedAt = new Date()
        const formattedDate = date.format(updatedAt, 'YYYY-MM-DD HH:mm:ss') ;

        const hashedPassword = await bcrypt.hash(password, saltRounds)
        const updatePassword = await userModel.update(
            {  password: hashedPassword,
               updatedAt: sequelize.literal(`'${formattedDate}'`)
            },
            { 
                where: { email: email } 
            }
        );

        // delete otp 
        await otpModel.destroy({
            where: {
                email: email
            }
        })
        
        await successRegistrationEmail({
            email: email,
            subject: "Password Updated Successfully", 
            message: "Congratulations! Your password has been updated successfully."
        })

        return res.status(200).json({
            status: "success",
            message: "Password updated successfully.",
            updatePassword
        });

       
    } catch (error) {
        console.log(error)
        return res.status(500).json({Error: 'Change password error in server'})
    }
}

module.exports = {
    changePassController,
    confirmOTP,
    confirmPassword
}

