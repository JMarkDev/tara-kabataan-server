const { sendEmail } = require("./sendEmail");
// const { AUTH_EMAIL } = process.env

const successRegistrationEmail = async ({
  email,
  subject,
  message,
  username,
  password,
}) => {
  try {
    if (!(email && subject && message)) {
      throw Error("Email, subject and message are required");
    }

    //send email
    const mailOptions = {
      from: "tarakabataan2024@gmail.com",
      to: email,
      subject,
      html: `<p style="font-size: 18px; color: #333; margin-bottom: 10px;">${message}</p>`,
    };

    await sendEmail(mailOptions);

    const successRegister = {
      email: username,
      subject,
      message,
      // username: username,
      // password: password,
    };
    return successRegister;
  } catch (error) {
    throw error;
  }
};

module.exports = { successRegistrationEmail };
