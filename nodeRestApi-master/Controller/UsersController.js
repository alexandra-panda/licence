'use strict'

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const response = require('./../response')
const db = require('./../settings/db')
const config = require('./../config')

exports.test = (req, res) => {
    console.log('>>>', req.body.email);
    response.status(200, 'asdasdas', res)
}

exports.signup = (req, res) => {
    console.log('>>>', req.body);
    db.query("SELECT `id`, `email`, `name` FROM `users` WHERE `email` = '" + req.body.email + "'", (error, rows, fields) => {
        if (error) {
            response.status(400, error, res)
        } else if (typeof rows !== 'undefined' && rows.length > 0) {
            const row = JSON.parse(JSON.stringify(rows))
            row.map(rw => {
                response.status(302, { message: `User with this email - ${rw.email} already exists!` }, res)
                return true
            })
        } else {
            const email = req.body.email
            const name = req.body.name
            const secondName = req.body.second_name !== '' ? req.body.second_name : 'no second name'

            const salt = bcrypt.genSaltSync(8)
            const password = bcrypt.hashSync(req.body.password, salt)

            const sql = "INSERT INTO `users`(`name`, `second_name`, `email`, `password`) VALUES('" + name + "', '" + secondName + "', '" + email + "', '" + password + "')";
            db.query(sql, (error, results) => {
                if (error) {
                    response.status(400, error, res)
                } else {
                    response.status(200, { message: `User registered !`, results }, res)
                }
            })

        }
    })

}

exports.signin = (req, res) => {

    db.query("SELECT `id`, `email`, `password` FROM `users` WHERE `email` = '" + req.body.email + "'", (error, rows, fields) => {
        if (error) {
            response.status(400, error, res)
        } else if (rows.length <= 0) {
            response.status(401, { message: `User with email - ${req.body.email} not Found. Please Register` }, res)
        } else {
            const row = JSON.parse(JSON.stringify(rows))
            row.map(rw => {
                const password = bcrypt.compareSync(req.body.password, rw.password)
                if (password) {
                    const token = jwt.sign({
                        userId: rw.id,
                        email: rw.email
                    }, config.jwt, { expiresIn: '2 days' })

                    response.status(200, { token: `Bearer ${token}` }, res)

                } else {
                    response.status(401, { message: `Password is wrong` }, res)
                }
                return true
            })
        }
    })

}