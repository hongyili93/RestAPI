
module.exports = function(app) {
    var User = require('../controllers/UserController');
    console.log("inside routes")
    // todoList Routes
    app.route('/')
        .get(User.me)
        .post(User.create);

};
