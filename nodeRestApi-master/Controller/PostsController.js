'use strict'

const response = require('./../response')

let posts = [
]

exports.getPosts = (req, res) => {
    response.status(200, posts, res)
}

exports.addPost = (req, res) => {
    console.log('>>new post', req.body);
    let p = req.body
    posts.push(JSON.parse(JSON.stringify(p)))
    response.status(200, posts, res)
}