const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    googleId: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    email: { // Add email field
        type: String,
        required: true
    },
    thumbnail: String
});

module.exports = mongoose.model('User', userSchema);
