/**
 * Controller for user related service endpoints
 */
const service = require('../services/UserService')
var mongoose = require('mongoose'),
    User = mongoose.model('User');
/**
 * Create new user in database
 * @param req the request
 * @param res the response
 */
function * create (req, res) {
    var hash_d = new Date();
    var data = req.body.email+ hash_d;
    var hash_token = crypto.createHash('sha1').update(data).digest("hex")
    console.log(hash_d);
    console.log(crypto.createHash('sha1').update(data).digest("hex"));

    var userData = {
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        token: hash_token
    }

    User.create(userData, function (error, user) {
        if (error) {
            return next(error);
        } else {
            req.session.userId = user._id;
            res.status(200).send({ auth: true, token: user.token });
        }
    });
}

/**
 * Return current user info
 * @param req the request
 * @param res the response
 */
function * me (req, res) {
    console.log('inside me function');
    res.send(yield service.me(req.headers['token']))
}
module.exports = {
    create,
    me
}
