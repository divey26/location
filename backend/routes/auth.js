//backend/routes/auth.js
const express = require('express');
const passport = require('passport');
const Location = require('../models/Location');

const router = express.Router();

// Middleware for checking if the user is authenticated
function ensureAuthenticated(req, res, next) {
    console.log("Authenticated user:", req.user);  // Add this for debugging

    if (req.isAuthenticated()) {
        return next();
    }
    res.status(401).json({ error: 'User not authenticated' });
}

// Google OAuth authentication
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', 
    passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
        console.log("User logged in:", req.user);  // Log user information
        res.redirect('/track');  // Redirect to tracking page
    }
);

// Track location route
router.post('/track-location', ensureAuthenticated, (req, res) => {
    console.log("Authenticated user in /track-location:", req.user);  // Debugging user session

    if (!req.user) {
        return res.status(401).json({ error: 'User not authenticated' });
    }

    const { latitude, longitude } = req.body;
    const employeeEmail = req.user.email;

    const location = new Location({ employeeEmail, latitude, longitude });

    location.save()
    .then(() => res.sendStatus(200))
    .catch(err => res.status(500).json({ error: err.message }));
});


module.exports = router;
