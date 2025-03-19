//Conexão com o banco de dados MySQL
const Sequelize = require ('sequelize')
const sequelize = new Sequelize('postapp', 'root', 'Loc11034', {
    host: "localhost",
    dialect: 'mysql',
    query:{raw:true} //precisa disso para que o sequelize envie os dados puros para a variavel posts
})

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize 
}