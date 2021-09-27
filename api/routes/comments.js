const options = require('../helper/options')
const { Post, User } = require('../helper/getAllModels')
const helperRoute = require('./helper/public')('Comment', options(Post, User))
const { router, controller } = helperRoute

router.delete('/:id', (req, res) => {
    controller.destroy(req, res)
})

module.exports = router