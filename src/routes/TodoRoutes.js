
module.exports = function(app) {
    var Todo = require('../controllers/TodoController');

    // todoList Routes
    app.route('/api/todo')
        .get(Todo.getAll)
        .post(Todo.create);


    app.route('/api/todo/:todoId')
        .get(Todo.search)
        .put(Todo.update)
        .patch(Todo.updatePartially)
        .delete(Todo.remove);
};
