/**
 * This service provides authentication-related operations
 */
const _ = require('lodash')
const Joi = require('joi')
const config = require('config')
const errors = require('../common/errors')
const User = require('../models/User')



/**
 * Authenticate with SSO
 * @param {String} email the email
 * @param {String} password the password
 * @returns {Object} the user profile and token, null if failed to authenticate
 * @private
 */
function * authenticateWithSSO (email, password) {
    // TODO: replace this MOCK with real implementation
    // The real implementation should return all required fields of user
    // including the token
    return Promise.resolve({
        email
    })
}

/**
 * Login by email and password
 * @param {Object} credentials the credentials
 * @returns {Object} the token information
 */
function * login (credentials) {
    // Invoke SSO to authenticate the user, get the token and user details
    const user = yield authenticateWithSSO(credentials.email, credentials.password)

    if (!user) {
        throw new errors.UnauthorizedError('Wrong username or password')
    }

    let dbUser = yield User.findOne({where: {email: user.email}})

    const result = {
        token: dbUser.token,
        user: _.omit(dbUser.toJSON(), 'token')
    }

    return result
}

login.schema = {
    credentials: Joi.object().keys({
        email: Joi.email(),
        password: Joi.string().max(255).required()
    })
}

module.exports = {
    login
}