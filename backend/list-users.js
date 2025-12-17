const mongoose = require('mongoose');
const User = require('./models/User');
const dotenv = require('dotenv');

dotenv.config();

const listUsers = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        const users = await User.find({}, 'name email mobile isVerified');
        const fs = require('fs');
        fs.writeFileSync('users.json', JSON.stringify(users, null, 2));
        console.log('Users written to users.json');
        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

listUsers();
