const { DataTypes, Model } = require('sequelize')
const { sequelize } = require('../helper/connection')
const { User } = require('./User')
const { Comment } = require('./Comment')

class Post extends Model {}

Post.init({
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    user_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    },
    createdAt: { type: Sequelize.DATE, field: 'created_at' },
    updatedAt: { type: Sequelize.DATE, field: 'updated_at' },

}, {
    sequelize,
    modelName: 'post'
})

Post.hasMany(Comment, {
    foreignKey: 'post_id'
})

module.exports = {
    Post
}
