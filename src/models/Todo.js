var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var TodoSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true
    },
    detail: {
        type: String
    },
    date: {
        type: Date,
        required: true
    },
    status: {
        type: Boolean,
        default: false
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

module.exports = mongoose.model('Todo', TodoSchema);