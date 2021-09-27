const { DataTypes, Model } = require('sequelize')
const { sequelize } = require('../helper/connection')
// const { Post } = require('./Post')
// const { Comment } = require("./Comment")

class User extends Model {}

User.init({
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    remember_token: {
        type: DataTypes.STRING,
        allowNull: false
    },
    createdAt: {type: DataTypes.DATE, field: 'created_at'},
    updatedAt: {type: DataTypes.DATE, field: 'updated_at'},

}, {
    sequelize,
    modelName: 'user',
    defaultScope: {
        attributes: {
            exclude: ['password', 'createdAt', 'updatedAt', 'remember_token']
        },
    }
})

// User.hasMany(Comment, {
//     foreignKey: 'user_id'
// })
//
// User.hasMany(Post, {
//     foreignKey: 'user_id'
// })


module.exports = {User}
