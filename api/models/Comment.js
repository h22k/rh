const { DataTypes, Model } = require('sequelize')
const { sequelize } = require('../helper/connection')

class Comment extends Model {}

Comment.init({
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    createdAt: { type: Sequelize.DATE, field: 'created_at' },
    updatedAt: { type: Sequelize.DATE, field: 'updated_at' },

}, {
    sequelize,
    modelName: 'comment'
})

module.exports = {
    Comment
}
