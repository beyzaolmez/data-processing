const nodemailer = require('nodemailer');

// Create a nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'rares.manoli@gmail.com', // replace with your email
    pass: 'raresmanoli2003', // replace with your email password
  },
});

// Function to send reset password email
const sendResetPasswordEmail = (email, token) => {
  const mailOptions = {
    from: 'rares.manoli@gmail.com', // replace with your email
    to: email,
    subject: 'Password Reset',
    text: `Click the following link to reset your password: http://localhost:3000/reset-password?token=${token}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Email sending failed:', error);
      // Handle error, such as logging it or sending an error response
    } else {
      console.log('Email sent:', info.response);
      // Handle success, such as logging it or sending a success response
    }
  });
};

// Example usage:
const userEmail = 'megasmith1053@gmal.com';
const resetToken = 'temporary_token'; // This would typically be generated dynamically

sendResetPasswordEmail(userEmail, resetToken);

