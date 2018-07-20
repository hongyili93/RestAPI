
const Todo = require('../models/Todo')
const User = require('../models/User')

function * me (token) {
    let temp_email = yield  User.findOne({'token': token}, function (err, user) {
        if (err) return null;
        return user.email;
    })

    return yield Todo.find({'email': temp_email});
}

function * create (body) {
    var hash_d = new Date();
    var data = body.email+ hash_d;
    var hash_token = crypto.createHash('sha1').update(data).digest("hex")

    var userData = {
        email: body.email,
        username: body.username,
        password: body.password,
        token: hash_token
    }

    User.create(userData, function (error, user) {
        if (error) {
            return next(error);
        } else {
            return user.token;
        }
    });
}
