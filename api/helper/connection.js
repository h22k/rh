const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('rh', 'postgres', 'password', {
    host: 'localhost',
    dialect: 'postgres',
    port: 5432
})

module.exports = {
    sequelize
}