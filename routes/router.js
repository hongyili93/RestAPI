var express = require('express');
var router = express.Router();
var userModel = require('../models/userModel');
var bodyParser = require('body-parser');

var verifyToken = require('./VerifyToken');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

var crypto = require('crypto');

var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../config');

// GET route for reading data
router.get('/', function (req, res, next) {
    return res.sendFile(path.join(__dirname + '/templateLogReg/index.html'));
});


//POST route for updating data
router.post('/', function (req, res, next) {
    // confirm that user typed same password twice
    if (req.body.password !== req.body.passwordConf) {
        var err = new Error('Passwords do not match.');
        err.status = 400;
        res.send("passwords dont match");
        return next(err);
    }

    if (req.body.email &&
        req.body.username &&
        req.body.password &&
        req.body.passwordConf) {

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

        userModel.create(userData, function (error, user) {
            if (error) {
                return next(error);
            } else {
                req.session.userId = user._id;
                res.status(200).send({ auth: true, token: user.token });
            }
        });

    } else if (req.body.logemail && req.body.logpassword) {
        userModel.findOne({ email: req.body.logemail }, function (err, user) {
            if (err) return res.status(500).send('Error on the server.');
            if (!user) return res.status(404).send('No user found.');
            var passwordIsValid = bcrypt.compareSync(req.body.logpassword, user.password);
            if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });
            var token = jwt.sign({ id: user._id }, config.secret, {
                expiresIn: 86400 // expires in 24 hours
            });
            res.status(200).send({ auth: true, token: token });
        });
    } else {
        var err = new Error('All fields required.');
        err.status = 400;
        return next(err);
    }
})

// GET route after registering
router.get('/profile', verifyToken, function (req, res, next) {
    userModel.findById(req.userId, { password: 0 }, function (err, user) {
        if (err) return res.status(500).send("There was a problem finding the user.");
        if (!user) return res.status(404).send("No user found.");
        console.log(req.userId);
        res.status(200).send(user);
    });
});

// GET for logout logout
router.get('/logout', function(req, res) {
    res.status(200).send({ auth: false, token: null });
});

module.exports = router;