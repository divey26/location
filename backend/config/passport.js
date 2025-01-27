const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const User = require('../models/User'); // Import your User model

module.exports = function(passport) {
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/callback'
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            // Check if user already exists in the database
            let user = await User.findOne({ googleId: profile.id });
            if (user) {
                // User found, return the user
                return done(null, user);
            } else {
                // Create a new user if not found
                user = await new User({
                    googleId: profile.id,
                    username: profile.displayName,
                    email: profile.emails[0].value, // Store the email
                    thumbnail: profile._json.picture
                }).save();
                return done(null, user);
            }
        } catch (err) {
            console.error("Error during authentication:", err);
            return done(err, null);
        }
    }));

    passport.serializeUser((user, done) => {
        console.log("Serializing user:", user.id);
        done(null, user.id); // Store the user's ID in the session
    });

    passport.deserializeUser((id, done) => {
        console.log("Deserializing user with id:", id);
        User.findById(id)
            .then(user => {
                if (!user) {
                    return done(new Error("User not found"), null);
                }
                console.log("User deserialized:", user);
                done(null, user);
            })
            .catch(err => {
                console.error("Error during deserialization:", err);
                done(err, null);
            });
    });
};
