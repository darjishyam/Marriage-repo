const mongoose = require('mongoose');
const User = require('./models/User');
const dotenv = require('dotenv');

dotenv.config();

const checkDb = async () => {
    try {
        console.log('URI:', process.env.MONGO_URI);
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB for inspection...');

        const users = await User.find({});
        console.log('\n================ USERS IN DATABASE ================');
        console.log('Users:', users.map(u => ({
            email: u.email,
            mobile: u.mobile,
            isVerified: u.isVerified,
            otp: u.otp
        })));
        console.log('====================================================\n');

        /*
        const Wedding = require('./models/Wedding');
        const weddings = await Wedding.find({});
        console.log('\n================ WEDDINGS IN DATABASE ================');
        console.log(JSON.stringify(weddings, null, 2));
        console.log('======================================================\n');

        const Guest = require('./models/Guest');
        const guests = await Guest.find({});
        console.log('\n================ GUESTS IN DATABASE ================');
        console.log(JSON.stringify(guests, null, 2));
        console.log('======================================================\n');
        */

        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

checkDb();
