const mongoose = require('mongoose');
const User = require('./models/User');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');

dotenv.config();

const debugLogin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        const email = "professorshyam123@gmail.com";
        const inputPassword = "12345678";

        console.log(`Checking login for: ${email}`);
        const user = await User.findOne({ email: email });

        if (!user) {
            console.log('User NOT FOUND.');
        } else {
            console.log('User FOUND.');
            console.log('Verified:', user.isVerified);
            console.log('Stored Hash:', user.password);

            const isMatch = await bcrypt.compare(inputPassword, user.password);
            console.log('Password "12345678" Match Result:', isMatch);

            if (isMatch) console.log('This means the password in DB is correct.');
            else console.log('This means the password in DB DOES NOT MATCH "12345678".');
        }
        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

debugLogin();
