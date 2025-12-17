const mongoose = require('mongoose');
const User = require('./models/User');
const dotenv = require('dotenv');

dotenv.config();

const findUser = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        const email = "professorshyam123@gmail.com";
        const user = await User.findOne({ email: email });

        console.log('--- USER CHECK ---');
        if (user) {
            console.log('User Found:');
            console.log('Email:', user.email);
            console.log('Verified:', user.isVerified);
            console.log('Mobile:', user.mobile);
            // We cannot check password hash directly but we can verify it works
            console.log('Password Hash exists:', !!user.password);
        } else {
            console.log('User with email ' + email + ' NOT FOUND.');
        }
        console.log('------------------');
        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

findUser();
