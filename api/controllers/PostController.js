const middleController = require('./MiddleController')
class PostController extends middleController{
    create(req, res) {
        super.create(req, res);
    }
}

module.exports = PostController
