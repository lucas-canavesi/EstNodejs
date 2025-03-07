const express = require("express")
const app = express()
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
//config
 //Template Engine
  app.engine('handlebars', handlebars.engine({defaultLayout: 'main'}))
  app.set('view engine', 'handlebars')

//Body-parser
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.get('/cad', function (req, res) {
    res.render('formulario')
})

app.post('/add', function (req, res) {
    res.send("Texto: "+req.body.titulo+" Conteudo: "+req.body.conteudo)
})

app.listen(8081, function () {
    console.log("Servido rodando!")
})
