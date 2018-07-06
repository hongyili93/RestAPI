const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bookRouter = require('./routes/bookRouter');
const todoRouter = require('./routes/todoRouter');
const routes = require('./routes/router');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);

const port = process.env.PORT || 5656;
const dblink = 'mongodb://boeboe:database1234@ds125881.mlab.com:25881/javascript';

// Connecting to the database
mongoose.connect(dblink);
var db = mongoose.connection;

//handle mongo error
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    // we're connected!
});

//use sessions for tracking logins
app.use(session({
    secret: 'work hard',
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({
        mongooseConnection: db
    })
}));

// setting body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// API routes
app.use('/api/books', bookRouter);
app.use('/api/todos', todoRouter);

app.use(express.static(__dirname + '/template'));
app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('File Not Found');
    err.status = 404;
    next(err);
});

// error handler
// define as the last app.use callback
app.use(function (err, req, res, next) {
    res.status(err.status||500).send(err.message);
});

// Running the server
app.listen(port, () => {
    console.log(`http://localhost:${port}`)
})