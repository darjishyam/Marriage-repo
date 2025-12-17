const mongoose = require('mongoose');
const User = require('./models/User');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');

dotenv.config();

const resetPass = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        const email = "professorshyam123@gmail.com";
        const user = await User.findOne({ email: email });

        if (user) {
            console.log('Resetting password for ' + email);
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash("12345678", salt);
            user.password = hashedPassword;
            await user.save();
            console.log('Password reset to 12345678 successfully.');
        } else {
            console.log('User not found.');
        }
        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

resetPass();
