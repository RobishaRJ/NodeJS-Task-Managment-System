const bcrypt = require('bcrypt');
const saltRounds = 15;

async function hashPassword(password) {
    try {
        // Generate a salt
        const salt = await bcrypt.genSalt(saltRounds);

        // Hash the password using bcrypt and the generated salt
        const hashedPassword = await bcrypt.hash(password, salt);

        return hashedPassword;
    } catch (error) {
        console.error('Error hashing password:', error);
        throw new Error('Unable to hash password');
    }
}
module.exports = hashPassword;
