

const config = require('config')
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')


// Connecting to the database
mongoose.connect(config.DB_URL);
var db = mongoose.connection;

const app = express();
//handle mongo error
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    // we're connected!
});

// setting body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//var TodoRoutes = require('./src/routes/TodoRoutes'); //importing route
//TodoRoutes(app);
var UserRoutes = require('./src/routes/UserRoutes'); //importing route
UserRoutes(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('File Not Found');
    err.status = 404;
    next(err);
});

// error handler
// define as the last app.use callback
app.use(function(req, res) {
    res.status(404).send({url: req.originalUrl + ' not found'})
});

// Running the server
app.listen(config.PORT, () => {
    console.log(`http://localhost:${config.PORT}`)
})


// Export the app module for testing
module.exports = app