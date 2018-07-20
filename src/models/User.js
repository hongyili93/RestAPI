var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    token: {
        type: String,
        required: true
    },
    Updated_date: {
        type: Date,
        default: Date.now
    },
    Created_date: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('User', UserSchema);