const axios = require('axios');

const testSignup = async () => {
    // 1. Test duplicate email
    console.log('\n--- Test 1: Duplicate Email ---');
    try {
        await axios.post('http://localhost:5000/api/auth/signup', {
            name: 'Test Email',
            email: 'professorshyam123@gmail.com', // Existing email
            password: 'password123',
            mobile: '9999999999' // New mobile
        });
    } catch (error) {
        console.log('Result:', error.response ? error.response.data.message : error.message);
    }

    // 2. Test duplicate mobile
    console.log('\n--- Test 2: Duplicate Mobile ---');
    try {
        await axios.post('http://localhost:5000/api/auth/signup', {
            name: 'Test Mobile',
            email: 'newemail@gmail.com', // New email
            password: 'password123',
            mobile: '6355094295' // Existing mobile
        });
    } catch (error) {
        console.log('Result:', error.response ? error.response.data.message : error.message);
    }
};

testSignup();
