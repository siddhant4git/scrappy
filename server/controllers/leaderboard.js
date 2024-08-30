const User = require('../models/user.models'); 

const getLeaderboard = async (req, res) => {
    try {
        const users = await User.find().sort({ points: -1 }).select('username points locality').exec();
        
        const leaderboard = users.map(user => ({
            username: user.username,
            points: user.points,
            location: user.locality
        }));

        res.json(leaderboard);

    } catch (error) {
        console.error('Error fetching leaderboard:', error.message);
        res.status(500).json({ error: 'An error occurred while fetching the leaderboard' });
    }
};

module.exports = { getLeaderboard };
