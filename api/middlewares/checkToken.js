const jwt = require('jsonwebtoken')
const responses = require('../helper/return')
function verify(req, res, next) {
    const token = req.headers['x-access-token'] || req.body.token

    const msg = 'You do not have permission to enter this URL.'

    if ( ! token) return responses.errorResponse(res, {msg}, 403)

    jwt.verify(token, req.app.get('apiSecretKey'), (err, decodedToken) => {
        if (err) return responses.errorResponse(res, {msg}, 403)
        req.decode = decodedToken
        next()
    })
}
module.exports = verify