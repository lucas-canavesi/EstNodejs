const {Sequelize} = require ('sequelize')
const sequelize = new Sequelize('testsequelize', 'root', 'Loc11034', {
    host: "localhost",
    dialect: 'mysql'
})

sequelize.authenticate().then(function () {
    console.log("Conectado com sucesso!")
}).catch(function (erro) {
    console.log("Falha ao se conectar: "+erro)
})
