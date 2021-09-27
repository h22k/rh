const { DataTypes, Model } = require('sequelize')
const { sequelize } = require('../helper/connection')
const {Post} = require('./Post')
const {User} = require('./User')

class Comment extends Model {}

Comment.init({
    comment: {
        type: DataTypes.STRING,
        allowNull: false
    },
    user_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
    },
    post_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
    },
    createdAt: { type: DataTypes.DATE, field: 'created_at' },
    updatedAt: { type: DataTypes.DATE, field: 'updated_at' },

}, {
    sequelize,
    modelName: 'comment'
})

//Comment
Comment.belongsTo(User, {
    foreignKey: 'user_id'
})
Comment.belongsTo(Post, {
    foreignKey: 'post_id'
})

//User
User.hasMany(Post, {
    foreignKey: 'user_id'
})
User.hasMany(Comment, {
    foreignKey: 'user_id'
})

//Post
Post.belongsTo(User, {
    foreignKey: 'user_id'
})
Post.hasMany(Comment, {
    foreignKey: 'post_id'
})

module.exports = {
    Comment
}
