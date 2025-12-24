const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
    // Create a transporter
    // For Render Free Tier / Serverless, it is better to create a FRESH connection
    // per email rather than pooling, because the server sleeps and kills idle connections.
    // Use 'service: gmail' for automatic configuration
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.SMTP_EMAIL,
            pass: process.env.SMTP_PASSWORD,
        },
    });

    // Define the email options
    const mailOptions = {
        from: `${process.env.FROM_NAME || 'Support'} <${process.env.SMTP_EMAIL}>`,
        to: options.email,
        subject: options.subject,
        text: options.message,
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);

    console.log('Message sent: %s', info.messageId);
    return info;
};

module.exports = sendEmail;
