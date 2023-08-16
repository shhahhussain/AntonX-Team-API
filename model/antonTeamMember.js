const mongoose = require('mongoose');

const Anton = mongoose.Schema({
    FullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        pattern: "^.+\@.+$", 
        description: "Required and must be a valid email address"
    },
    Dop: {
        type: Date,
        required: true
    },
    atnNumber: {
        type: Number,
        required: true,
        unique: true
    },
    profileImage: {
        data:Buffer,
        contentType:String
    },
    isAdmin:{
        type: Boolean,
        default: false
    }
});
Anton.path('email').validate(function (email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}, 'Invalid email format');

module.exports = mongoose.model('Anton', Anton);