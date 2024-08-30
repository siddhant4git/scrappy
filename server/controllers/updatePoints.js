const jwt = require('jsonwebtoken');
const User = require('../models/user.models'); 

const updatePoints = async (req, res) => {
    try {
        const token = req.headers['x-access-token'];

        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'defaultSecret');

        const email = decoded.email;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const pointsToAdd = req.body.points;
        if (typeof pointsToAdd !== 'number' || pointsToAdd <= 0) {
            return res.status(400).json({ error: 'Invalid points value' });
        }

        user.points += pointsToAdd;
        await user.save();

        res.json({ points: user.points });

    } catch (error) {
        console.error('Error updating points:', error.message);
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ error: 'Token has expired' });
        }
        res.status(401).json({ error: 'Invalid token' });
    }
};

module.exports = { updatePoints };
