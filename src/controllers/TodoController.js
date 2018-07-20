/**
 * Controller for to-do item related service endpoints
 */
const service = require('../services/TodoService')

/**
 * Get ALL to-do item from database
 * @param req the request
 * @param res the response
 */
function * getAll (req, res) {
    res.send(yield service.getAll(req.params.token))
}

/**
 * Create a to-do item by its id
 * @param req the request
 * @param res the response
 */
function * create (req, res) {
    res.send(yield service.create(req.params.token, req.body))
}

/**
 * Search a to-do item by its id
 * @param req the request
 * @param res the response
 */
function * search (req, res) {
    res.send(yield service.search(req.params.token, req.params.id))
}


/**
 * Update a to-do item by its id
 * @param req the request
 * @param res the response
 */
function * update (req, res) {
    res.send(yield service.update(req.params.token, req.params.id, req.body))
}

/**
 * Update Partially a to-do item by its id
 * @param req the request
 * @param res the response
 */
function * updatePartially (req, res) {
    res.send(yield service.updatePartially(req.params.token, req.params.id, req.body))
}

/**
 * Remove a to-do item by its id
 * @param req the request
 * @param res the response
 */
function * remove (req, res) {
    res.send(yield service.remove(req.params.token, req.params.id))
}
module.exports = {
    getAll,
    create,
    search,
    update,
    updatePartially,
    remove
}
