
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const todoModel = new Schema({
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
module.exports = mongoose.model('todos', todoModel)