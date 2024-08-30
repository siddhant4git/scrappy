const jwt = require('jsonwebtoken');
const User = require('../models/user.models'); 

const getProfile = async (req, res) => {
    try {

        const { email, fullname, locality, username } = req.user;

        const user = await User.findOne({ email, fullname, locality, username });

        if (!user) {
            return res.status(404).json({ status: 'error', error: 'User not found' });
        }

        res.json({ status: 'ok', user });

    } catch (error) {
        console.error('Error fetching profile:', error.message);
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ status: 'error', error: 'Token has expired' });
        }
        res.status(401).json({ status: 'error', error: 'Invalid token' });
    }
};

module.exports = { getProfile };
