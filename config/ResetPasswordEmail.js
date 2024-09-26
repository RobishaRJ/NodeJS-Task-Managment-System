function generatePasswordResetEmail(userName, newPassword) {
    const emailSubject = 'Password Reset Confirmation';
    const companyName = 'October Breast Cancer Support Organization';
  
    const emailBody = `
      Dear ${userName},
  
      We wanted to inform you that your password has been reset. Below is your new password:

      New Password: ${newPassword}
  
      For security reasons, we recommend changing your password after logging in. To do so, follow these steps:
      
      1. Log in using the provided new password.
      2. Access your account settings or profile page.
      3. Choose the option to change or update your password.
      4. Set a new, secure password that you can easily remember.
  
      Please keep this email secure, and do not share your password with anyone. If you did not request a password reset or have any concerns, please contact our support team.
  
      Thank you for choosing ${companyName}.
  
      Best regards,
      ${companyName}
    `;
    return { subject: emailSubject, body: emailBody };
  }
  module.exports = generatePasswordResetEmail
  