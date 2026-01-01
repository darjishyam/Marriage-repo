const mongoose = require('mongoose');
const User = require('./models/User');
const dotenv = require('dotenv');

dotenv.config();

const verifyAll = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to DB. Verifying all users...');

        const result = await User.updateMany(
            {}, // Filter: all users
            { $set: { isVerified: true } } // Update: set isVerified to true
        );

        console.log(`Matched ${result.matchedCount} users.`);
        console.log(`Modified ${result.modifiedCount} users to be Verified.`);

        // List them just to be sure
        const users = await User.find({}, 'name email isVerified');
        console.log('Current User Statuses:');
        users.forEach(u => console.log(`- ${u.email}: ${u.isVerified}`));

        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

verifyAll();
