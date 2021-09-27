const { jsonResponse } = require('../helper/return')

class BaseController {

    constructor(modelName, options) {
        this.modelName = modelName
        this.options = options
        this.model = require(`${__dirname}/../models/${modelName}`)
    }

    get(req, res) {
        jsonResponse(res, this.model[this.modelName].findAll(_.merge(this.options, {order: [['id', 'DESC']]})))
    }

    getOne(req, res) {
        const {id} = req.params

        jsonResponse(res, this.model[this.modelName].findOne(_.merge({where: {id}}, this.options)))
    }

    create(req, res) {
        jsonResponse(res, this.model[this.modelName].create(req.body))
    }

}

module.exports = BaseController
