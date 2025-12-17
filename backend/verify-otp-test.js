const axios = require('axios');
const mongoose = require('mongoose');
const User = require('./models/User');
const dotenv = require('dotenv');

dotenv.config();

const testOtpFlow = async () => {
    const testUser = {
        name: 'Otp Test User',
        email: `otp_test_${Date.now()}@example.com`,
        password: 'password123',
        mobile: `0000${Math.floor(Math.random() * 1000000)}` // Random unique mobile
    };

    try {
        // 1. Signup
        console.log('--- Step 1: Signup ---');
        console.log('Registering user:', testUser.mobile);
        const signupRes = await axios.post('http://localhost:5000/api/auth/signup', testUser);
        console.log('Signup Status:', signupRes.status);

        // 2. Fetch OTP from DB directly (to simulate user reading it)
        await mongoose.connect(process.env.MONGO_URI);
        const user = await User.findOne({ mobile: testUser.mobile });

        if (!user || !user.otp) {
            console.error('CRITICAL: User created but no OTP found in DB!');
            process.exit(1);
        }

        const otpFromDb = user.otp;
        console.log('OTP found in DB:', otpFromDb);
        console.log('OTP Type:', typeof otpFromDb);

        // 3. Verify OTP (Standard String)
        console.log('\n--- Step 2: Verify OTP (Clean String) ---');
        const verifyPayload = {
            mobile: testUser.mobile,
            otp: otpFromDb
        };
        const verifyRes = await axios.post('http://localhost:5000/api/auth/verify-otp', verifyPayload);
        console.log('Clean String Verify:', verifyRes.status === 200 ? 'SUCCESS' : 'FAIL');

        // 4. Test Edge Case: Number Type
        console.log('\n--- Step 3: Verify OTP (Number Type) ---');
        // Register a new user for this test to avoid "already verified"
        testUser.mobile = `0000${Math.floor(Math.random() * 1000000)}`;
        testUser.email = `otp_test_${Date.now()}_num@example.com`;
        await axios.post('http://localhost:5000/api/auth/signup', testUser);
        const user2 = await User.findOne({ mobile: testUser.mobile });

        try {
            await axios.post('http://localhost:5000/api/auth/verify-otp', {
                mobile: testUser.mobile,
                otp: parseInt(user2.otp) // Send as Number
            });
            console.log('Number Type Verify: SUCCESS');
        } catch (e) {
            console.log('Number Type Verify: FAILED (Strict Type Check?)');
        }



    } catch (error) {
        console.log('\nFAILURE during flow');
        if (error.response) {
            console.log('Status:', error.response.status);
            console.log('Data:', error.response.data);
        } else {
            console.log('Error:', error.message);
        }
    } finally {
        await mongoose.connection.close();
    }
};

testOtpFlow();
