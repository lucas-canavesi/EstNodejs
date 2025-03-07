const Sequelize = require('sequelize')
const sequelize = new Sequelize('testsequelize', 'root', 'Loc11034', {
    host: 'localhost',
    dialect: 'mysql'
})

const Postagem = sequelize.define('postagens', {
    titulo: {
        type: Sequelize.STRING
    },
    conteudo: {
        type: Sequelize.TEXT
    }
}) 

//Postagem.create({
    //titulo: "Titulo qualquer!",
    //conteudo: "ashudaiudhaiudhiauhdaiudhaiu"
//})//desativar nodemon quando for fazer isso 
// deixar comentado apos o premeiro node index.js se nao cria mais de uma vez
const Usuario = sequelize.define('usuarios', {
    nome: {
        type: Sequelize.STRING
    },
    sobrenome: {
        type: Sequelize.STRING
    },
    idade: {
        type: Sequelize.INTEGER
    },
    email: {
        type:Sequelize.STRING
    }
})

//Usuario.create({
    //nome: "Lucas",
    //sobrenome: "Canavesi",
    //idade: 28,
    //email: "lucascanavesi@gmail.com"
//})

//Usuario.sync({force: true}) para mandar a tabela para o mysql


