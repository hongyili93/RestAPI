
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const todoModel = new Schema({
    UserId: String,
    title: String,
    detail: String,
    date: Date,
    status: Boolean
});
module.exports = mongoose.model('todos', todoModel)