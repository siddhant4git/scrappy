const bcrypt = require('bcrypt');
const User = require('../models/user.models'); 

const registerUser = async (req, res) => {
    try {
        const { name, email, password, username, locality } = req.body;

        if (!name || !email || !password || !username || !locality) {
            return res.status(400).json({ status: 'error', error: 'All fields are required' });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ status: 'error', error: 'Email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            username,
            locality,
            points: 0
        });

        await newUser.save();

        res.json({ status: 'ok' });
        console.log('User registered:', newUser);

    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ status: 'error', error: 'Internal server error' });
    }
};

module.exports = { registerUser };
