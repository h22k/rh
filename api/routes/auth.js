const express = require('express')
const {User} = require("../models/User");
const responses = require('../helper/return')
const router = express.Router()
const jwt = require('jsonwebtoken')

router.post('/login', (req, res) => {
    const {email, password} = req.body

    User.findOne({where: {email, password}}).then(user => {

        if ( ! user) {
            return responses.errorResponse(res, {msg: 'Authentication failed! Email or password is wrong.'})
        }

        const payload = {
            email: user.email,
            id: user.id
        }

        const token = jwt.sign(payload, req.app.get('apiSecretKey'), {
            expiresIn: 1440
        })

        return responses.successResponse(res, {token})

    }).catch(err => {
        responses.errorResponse(res, {msg: 'DB Error!'})
    })
})

module.exports = router