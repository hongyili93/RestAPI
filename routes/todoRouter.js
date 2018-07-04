const express = require('express');
const Todo = require('../models/todoModel');
const todoRouter = express.Router();
todoRouter.route('/')
    .get((req, res) => {
        Todo.find({'UserId':req.session.userId}, (err, todos) => {
            //console.log(todos);
            res.json(todos)
        })
    })
    .post((req, res) => {
        let todo = new Todo(req.body);
        todo.UserId = req.session.userId;
        todo.save();
        res.status(201).send(todo)
    })

// Middleware
todoRouter.use('/:todoId', (req, res, next)=>{
    Todo.findById( req.params.todoId, (err,todo)=>{
        if(err)
            res.status(500).send(err)
        else {
            req.todo = todo;
            next()
        }
    })
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
        for( let p in req.body ){
            req.todo[p] = req.body[p]
        }
        req.todo.save()
        res.json(req.todo)
    })
    .delete((req,res)=>{
        req.todo.remove(err => {
            if(err){
                res.status(500).send(err)
            }
            else{
                res.status(204).send('removed')
            }
        })
    })

module.exports = todoRouter;