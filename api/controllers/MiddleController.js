const baseController = require('./BaseController')
const {jsonResponse} = require("../helper/return");

class MiddleController extends baseController {

    destroy(req, res) {
        const {id} = req.params

        jsonResponse(res, this.model[this.modelName].destroy({
            where: {id}
        }))
    }

}

module.exports = MiddleController