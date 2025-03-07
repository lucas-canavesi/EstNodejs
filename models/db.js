//Conexão com o banco de dados MySQL
const Sequelize = require ('sequelize')
const sequelize = new Sequelize('postapp', 'root', 'Loc11034', {
    host: "localhost",
    dialect: 'mysql'
})

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize 
}