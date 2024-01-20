const { sendOTP } = require('../utils/sendOTP')
const userModel = require('../models/userModel')
const otpModel = require('../models/otpModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { successRegistrationEmail } = require('../utils/successRegistrationEmail')
const date = require('date-and-time')
const sequelize = require('../configs/database');

const postOtp = async (email) => {
    try {
      // Your existing code for generating and sending OTP
      const createdOTP = await sendOTP({
        email: email,
        subject: "Tara Kabataan Verification Code",
        message: "Verify your email with the code below.",
        duration: 5,
      });
  
      return createdOTP; // Return the created OTP
    } catch (error) {
      console.error(error);
      throw new Error('Error generating and sending OTP');
    }
  };

const verifyOTP = async (req, res) => {
  const { email, otp } = req.body

  try {
    const userData = await userModel.findOne({
      attributes: ['id', 'email', 'role'],
      where: {
        email: email
      }
    })

    console.log(userData)

    const matchedOTPRecord = await otpModel.findOne({
      where: {
        email: email
      }
    })

    const { expiresAt } = matchedOTPRecord;

    const verifyOtpResult = await otpModel.findOne({
      attributes: ['id', 'otp'],
      where: {
          email: email,
      },
    });


    if (verifyOtpResult) {
      const matchOtp = await bcrypt.compare(otp, verifyOtpResult.otp);

      if(matchOtp && expiresAt > Date.now()) {

        const updatedAt = new Date()
        const formattedDate = date.format(updatedAt, 'YYYY-MM-DD HH:mm:ss') ;
        
        //update user status
          await userModel.update(
            { status: 'verified',
              updatedAt: sequelize.literal(`'${formattedDate}'`),
            },
            {
              where: {
                email: email
              }
            }
          );

          // delete otp 
          await otpModel.destroy({
            where: {
              email: email
            }
          })

          // register user
          const {id: userId, email: userEmail, role: userRole} = userData

          const token = jwt.sign({userId, userEmail, userRole}, 'decoded-secret-key', {expiresIn: '1d'})

           // Set a secure HTTP-only cookie
           res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
 
           // Send success registration email
           await successRegistrationEmail({
            email: email, 
            subject: "Tara Kabataan Registration Successful", 
            message: "Thank you for registering. Your account has been successfully created."
        })
 
        return res.status(200).json({ 
            status: "success", 
            message: "Registration successful", 
            token: token,
            role: userRole,
            userId: userId
        });

      }  else if (expiresAt < Date.now() && matchOtp){
        // If OTP is expired but still matches, indicate failure in the response
        return res.status(200).json({ 
            verified: false, 
            message: "Code has expired. Request for a new one"
        });
      } else {
        // If OTP doesn't match, indicate failure in the response
        return res.status(200).json({ 
            verified: false, 
            message: "Invalid OTP. Please try again."
        });
      }


    } else {
      // If no matching OTP record is found, indicate failure in the response
      return res.status(200).json({ 
          verified: false, 
          message: "Invalid OTP. Please try again."
      });
  }

  } catch (error) {
    console.error(error)
    return res.status(500).json({Error: 'Error verify OTP'})
  }
}

const resendOTP = async (req, res) => {
  try {
      const { email } = req.body;
      if(!email) throw Error("An email is required!");

      // Delete existing OTP record
      await otpModel.destroy({
          where: {
              email: email
          }
      });

      const createdOTP = await sendOTP({
          email,
          subject: "Tara Kabataan Verification Code",
          message: "Verify your email with the code below.",
          duration: 5,
      });
      
      return res.status(200).json({
          status: "success",
          message: `Successfully resent OTP to ${email}`,
          createdOTP
      });

  } catch (error) {
      return res.status(400).send(error.message)
  }
}

  module.exports = {
    postOtp,
    verifyOTP,
    resendOTP
  }