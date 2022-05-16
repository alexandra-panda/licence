'use strict'

module.exports = (app) => {
    const passport = require('passport')
    const usersController = require('./../Controller/UsersController')
    const postsController = require('./../Controller/PostsController')
    // passport.authenticate('jwt', { session: false }),
    // in case of jwt

    app
        .route('/api/auth/signup')
        .post(usersController.signup)

    app
        .route('/api/auth/signin')
        .post(usersController.signin)
    app
        .route('/api/posts')
        .get(postsController.getPosts)

    app
        .route('/api/posts')
        .get(postsController.getPosts)
    app
        .route('/api/addPost')
        .post(postsController.addPost)
}