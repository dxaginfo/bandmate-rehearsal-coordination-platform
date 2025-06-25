const express = require('express');
const authRoutes = require('./auth');
const userRoutes = require('./users');
const bandRoutes = require('./bands');
const rehearsalRoutes = require('./rehearsals');
const venueRoutes = require('./venues');
const songRoutes = require('./songs');
const setlistRoutes = require('./setlists');

const router = express.Router();

// Health check endpoint
router.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// API routes
router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/bands', bandRoutes);
router.use('/rehearsals', rehearsalRoutes);
router.use('/venues', venueRoutes);
router.use('/songs', songRoutes);
router.use('/setlists', setlistRoutes);

module.exports = router;
