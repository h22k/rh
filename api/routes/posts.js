//Sorry about duplicate code :/ reference -> ./comments.js

const options = require('../helper/options')
const { Comment, User } = require('../helper/getAllModels')
const helperRoute = require('./helper/public')('Post', options(Comment, User))
const { router, controller } = helperRoute

router.delete('/:id', (req, res) => {
    controller.destroy(req, res)
})

module.exports = router