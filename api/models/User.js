const { DataTypes, Model } = require('sequelize')
const { sequelize } = require('../helper/connection')

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
    createdAt: { type: DataTypes.DATE, field: 'created_at' },
    updatedAt: { type: DataTypes.DATE, field: 'updated_at' },

}, {
    sequelize,
    modelName: 'user'
})

module.exports = {
    User
}
