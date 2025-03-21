// Congigurando mongoose
const mongoose = require("mongoose")

mongoose.Promise = global.Promise

mongoose.connect("mongodb://localhost/aprendendo").then(() => {
    console.log("Mongodb conectado")
}).catch((erro) => {
    console.log("Houve um erro!"+ erro)
})

//Model - Usuarios

//Definindo o model

const UsuariosSchema = mongoose.Schema({
     nome: {
        type: String,
        require:true
     },
     sobrenome:{
        type: String,
        require:true
     },
     email: {
        type: String,
        require: true
     },
     idade: {
        type: Number,
        require: true
     },
     pais: {
        type: String,
        require: true
     }
})

//Collection
mongoose.model('usuarios', UsuariosSchema)

//crinado novo usuario

const Lucas = mongoose.model('usuarios')
new Lucas ({
    nome: "Lucas",
    sobrenome: "Canavesi",
    email: "lucascanavesicienco@gmail.com",
    idade: 19,
    pais: "Brasil"
}).save().then(()=>{
    console.log("Usuario cadastrado com sucesso")
}).catch((erro)=>{
    console.log("Houve um erro! " + erro)
})

