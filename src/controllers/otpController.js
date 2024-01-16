const { sendOTP } = require('../utils/sendOTP')
const userModel = require('../models/userModel')
const otpModel = require('../models/otpModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { successRegistrationEmail } = require('../utils/successRegistrationEmail')
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


    // if (verifyOtpResult) {
      const matchOtp = await bcrypt.compare(otp, verifyOtpResult.otp);
      console.log(verifyOtpResult.otp)
      console.log(matchOtp)
      if(matchOtp && expiresAt > Date.now()) {
        //update user status
          await userModel.update(
            {status: 'verified'},
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
            userRole,
            userId 
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


  //   } else {
  //     // If no matching OTP record is found, indicate failure in the response
  //     return res.status(200).json({ 
  //         verified: false, 
  //         message: "Invalid OTP. Please try again."
  //     });
  // }

  } catch (error) {
    console.error(error)
    return res.status(500).json({Error: 'Error verify OTP'})
  }

}



  module.exports = {
    postOtp,
    verifyOTP
  }