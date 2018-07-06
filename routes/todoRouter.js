const express = require('express');
const Todo = require('../models/todoModel');
const todoRouter = express.Router();
var userModel = require('../models/userModel');
var bodyParser = require('body-parser');

var verifyToken = require('./VerifyToken');

todoRouter.use(bodyParser.urlencoded({ extended: false }));
todoRouter.use(bodyParser.json());

todoRouter.get('/', verifyToken, function (req, res, next) {
    userModel.findById(req.userId, { password: 0 }, function (err, user) {
        if (err) return res.status(500).send("There was a problem finding the user.");
        if (!user) return res.status(404).send("No user found.");
        Todo.find({'UserId':req.userId}, (err, todos) => {
            res.status(200).send(todos);
        })
    });
});

todoRouter.post('/', verifyToken, function (req, res, next) {
    userModel.findById(req.userId, { password: 0 }, function (err, user) {

        if (err) return res.status(500).send("There was a problem finding the user.");
        if (!user) return res.status(404).send("No user found.");
        let todo = new Todo(req.body);
        todo.UserId = req.userId;
        todo.save();
        res.status(201).send(todo)
    });
});


// Middleware
todoRouter.use('/:todoId', verifyToken, (req, res, next)=>{
    userModel.findById(req.userId, { password: 0 }, function (err, user) {
        if (err) return res.status(500).send("There was a problem finding the user.");
        if (!user) return res.status(404).send("No user found.");
        Todo.findOne({ '_id':req.params.todoId, 'UserId':req.userId }, (err,todo)=>{
            if(err)
                res.status(500).send(err)
            else {
                if (!todo) return res.status(404).send("No todo found.");
                req.todo = todo;
                next()
            }
        })
    });
})
todoRouter.route('/:todoId')
    .get((req, res) => {
        res.json(req.todo)
    })
    .put((req,res) => {
        req.todo.title = req.body.title;
        req.todo.detail = req.body.detail;
        req.todo.date = req.body.date;
        req.todo.status = req.body.status;
        req.todo.save()
        res.json(req.todo)
    })
    .patch((req,res)=>{
        if(req.body._id){
            delete req.body._id;
        }
        if(req.body.UserId){
            delete req.body._id;
        }
        for( let p in req.body ){
            req.todo[p] = req.body[p]
        }
        req.todo.save()
        res.json(req.todo)
    })
    .delete((req,res)=>{
        Todo.findByIdAndRemove(req.params.todoId, (err, todo) => {
            if (err) return res.status(500).send(err);
            const response = {
                message: "Todo successfully deleted",
                id: todo._id
            };
            return res.status(200).send(response);
        });
    })

module.exports = todoRouter;