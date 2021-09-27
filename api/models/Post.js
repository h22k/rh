const { DataTypes, Model } = require('sequelize')
const { sequelize } = require('../helper/connection')
const { User } = require('./User')
class Post extends Model {}

Post.init({
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    user_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
            model: User,
            key: 'id',
        },
    },
    createdAt: { type: DataTypes.DATE, field: 'created_at' },
    updatedAt: { type: DataTypes.DATE, field: 'updated_at' },

}, {
    sequelize,
    modelName: 'post'
})

// Post.hasMany(Comment, {
//     foreignKey: 'post_id'
// })
//
// Post.belongsTo(User, {
//     foreignKey: 'user_id'
// })

module.exports = {
    Post
}
