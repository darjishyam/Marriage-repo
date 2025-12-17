const mongoose = require('mongoose');
const User = require('./models/User');
const dotenv = require('dotenv');

dotenv.config();

const verifyUser = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        const email = "professorshyam123@gmail.com";
        const user = await User.findOne({ email: email });

        if (user) {
            console.log('Current Status Verified:', user.isVerified);
            user.isVerified = true;
            await user.save();
            console.log('User Force Verified Successfully.');
        } else {
            console.log('User not found.');
        }
        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

verifyUser();
