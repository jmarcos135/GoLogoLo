var mongoose = require('mongoose');
const Logo = require('./Logo.js')

var UserSchema = new mongoose.Schema({
    id: String,
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    logos: [Logo.LogoSchema]
});

module.exports = mongoose.model('User', UserSchema);