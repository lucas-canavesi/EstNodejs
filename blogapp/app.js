// Carregando Módulos
    const express = require('express')
    const handlebars = require('express-handlebars')
    const bodyParser = require('body-parser')
    const app = express()
    const mongoose = require ('mongoose')
    const admin = require('./routes/admin')
    const path = require('path')
    const session = require('express-session')
    const flash = require('connect-flash')
    require('./models/Postagem')
    const Postagem = mongoose.model("postagens")

// Configurações
    // Session
        app.use(session({
            secret: "cursodenode",
            resave: true,
            saveUninitialized: true
        }))
        app.use(flash())
    //Midleware
        app.use((req, res, next) => {
            res.locals.success_msg = req.flash('success_msg')
            res.locals.error_msg = req.flash('error_msg')
            next()
        })        
    // Body-Parser
        app.use(bodyParser.urlencoded({extended: true}))
        app.use(bodyParser.json())
    // Handlebars
        app.engine('handlebars', handlebars.engine({defaultLayout: 'main'}))
        app.set('view engine', 'handlebars') 
    // Mongoose
        mongoose.Promise = global.Promise
        mongoose.connect('mongodb://localhost/blogapp').then(() => {
            console.log("Conectado ao mongo!")
        }).catch((erro) => {
            console.log("Erro ao conectar!"+erro)
        }) 
    // Public
        app.use(express.static(path.join(__dirname, "public")))

// Rotas
    app.get('/', (req,res) => {
        Postagem.find().lean().populate("categorias").sort({data: 'desc'}).then((postagens) => {
            res.render('index', {postagens: postagens})
        }).catch((error) => {
            req.flash("error_msg", "Houve um erro interno!")
            res.redirect('/404')
        })
    })

    app.get('/404', (req, res) => {
        res.send("Erro 404!")
    })


    app.get('/posts', (req, res) => {
        res.send("Lista de posts!")
    })
    app.use('/admin', admin)
// Outros
    const Port = 8081
    app.listen (Port, () => {
        console.log("Servidor rodando!")
    })
