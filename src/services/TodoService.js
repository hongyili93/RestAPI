/**
 * This service provides operations to manage To-do item
 */

const Todo = require('../models/Todo')
const User = require('../models/User')

function * getAll (token) {
    let temp_email = yield  User.findOne({'token': token}, function (err, user) {
        if (err) return null;
        return user.email;
    })

    return yield Todo.find({'email': temp_email});
}

function * create (token, body) {
    let temp_email = yield  User.findOne({'token': token}, function (err, user) {
        if (err) return null;
        return user.email;
    })
    let todo = new Todo(body);
    todo.email = temp_email;
    todo.save();
    return yield todo;
}

function * search (token, id) {
    return '1';
}

function * update (token, id, body) {
    return '1';
}

function * updatePartially (token, id, body) {
    return '1';
}

function * remove (token, id) {
    return '1';
}