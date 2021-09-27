const options = require('../helper/options')
const { Post, Comment } = require('../helper/getAllModels')
const helperRoute = require('./helper/public')('User', options(Post, Comment))

module.exports = helperRoute.router