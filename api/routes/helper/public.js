function publicRoute(prefix, options) {
    const express = require('express')
    const router = express.Router()
    const requireIf = require('../../helper/require')

    const controller = requireIf(prefix, options)

//All data
    router.get('/', (req, res) =>
        controller.get(req, res))
//One data by id
    router.get('/:id', (req, res) => {
        controller.getOne(req, res)
    })
//Create data
    router.post('/create', (req, res) => {
        controller.create(req, res)
    })


    return {
        router,
        controller
    }
}

module.exports = publicRoute