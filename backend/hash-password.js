const bcrypt = require('bcryptjs');
const fs = require('fs');

const password = 'Example@16';
const saltRounds = 10;

bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log(`Password: ${password}`);
    console.log(`Hash: ${hash}`);
    fs.writeFileSync('password_hash.txt', hash);
});
