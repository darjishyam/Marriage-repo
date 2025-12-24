const axios = require('axios');

const sendEmail = async (options) => {
    // USE BREVO HTTP API (Bypasses SMTP Port Blocking)
    const apiKey = process.env.BREVO_API_KEY;

    if (!apiKey) {
        console.error('BREVO_API_KEY is missing in environment variables');
        throw new Error('Email configuration missing');
    }

    const data = {
        sender: {
            name: 'Shagun App', // Explicit Sender Name
            email: process.env.SMTP_EMAIL || 'professorshyam123@gmail.com'
        },
        to: [
            {
                email: options.email,
                name: options.name || 'User'
            }
        ],
        subject: options.subject,
        htmlContent: `<p>${options.message}</p>`, // Use htmlContent instead of textContent for better delivery
    };

    console.log('Sending Email Payload:', JSON.stringify(data, null, 2));

    try {
        const response = await axios.post('https://api.brevo.com/v3/smtp/email', data, {
            headers: {
                'accept': 'application/json',
                'api-key': apiKey,
                'content-type': 'application/json'
            },
            timeout: 10000 // 10s timeout
        });

        console.log('Email sent via Brevo API. MessageId:', response.data.messageId);
        return response.data;
    } catch (error) {
        if (error.response) {
            console.error('Brevo API Error:', error.response.status, error.response.data);
        } else {
            console.error('Email Sending Error:', error.message);
        }
        // Don't throw, just log, so flow continues (background)
    }
};

module.exports = sendEmail;
