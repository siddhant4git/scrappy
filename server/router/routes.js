const express = require('express');
const router = express.Router();

const { registerUser } = require('../controllers/register');
const { loginUser } = require('../controllers/login');
const { getProfile } = require('../controllers/profile.js');
const { createEvent } = require('../controllers/createEvent');
const { getCreatedEvents } = require('../controllers/showEvents');
const { updatePoints } = require('../controllers/updatePoints');
const { getLeaderboard } = require('../controllers/leaderboard');
const { donate } = require('../controllers/donate');
const { authenticate } = require('../middleware/auth');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', authenticate, getProfile);
router.post('/events', createEvent);
router.get('/eventscreated', getCreatedEvents);
router.post('/points', updatePoints);
router.get('/leaderboard', getLeaderboard);
router.post('/donate', donate);

module.exports = router;
