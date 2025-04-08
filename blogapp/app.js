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
    require('./models/Categoria')
    const Categoria = mongoose.model('categorias')
    const usuarios = require('./routes/usuario')
    const passport = require('passport')
    require('./config/auth')(passport)

// Configurações
    // Session
        app.use(session({
            secret: "cursodenode",
            resave: true,
            saveUninitialized: true
        }))
        app.use(passport.initialize())
        app.use(passport.session())
        app.use(flash())
    //Midleware
        app.use((req, res, next) => {
            res.locals.success_msg = req.flash('success_msg')
            res.locals.error_msg = req.flash('error_msg')
            res.locals.error = req.flash('error')
            res.locals.user = req.user || null
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

    app.get('/postagens/:slug', (req, res) => {
        Postagem.findOne(({slug: req.params.slug})).lean().then((postagens) => {
            if(postagens){
                res.render('postagens/index', {postagens: postagens})
            }else{
                req.flash("error_msg", "Esta postagem nao existe!")
                res.redirect('/')
            }
        }).catch((error) => {
            req.flash("error_msg", "Houve um erro interno")
            res.redirect('/')
        })
    })

    app.get('/categorias/:slug', (req, res) => {
        Categoria.findOne({slug: req.params.slug}).lean().then((categorias) => {
            if(categorias){
                Postagem.find({categorias: categorias._id}).lean().then((postagens) => {
                    res.render('categorias/postagens', {postagens: postagens, categorias: categorias})
                }).catch((error) => {
                    req.flash("error_msg", "Houve um erro ao listar o post")
                    res.redirect('/')
                })
            }else{
                req.flash("error_msg", "Esta categoria não exite")
                res.redirect('/')
            }
        }).catch((error) => {
            req.flash("error_msg", "Houve um erro interno ao carregar a pagina desta categoria")
            res.redirect('/')
        })
    })

    app.get('/404', (req, res) => {
        res.send("Erro 404!")
    })
    
    app.get('/categorias', (req, res) => {
        Categoria.find().lean().then((categorias) => {
            res.render('categorias/index', {categorias: categorias})
        }).catch((error) => {
            req.flash("error_msg", "Houve um erro interno ao listar categorias")
            res.redirect('/')
        })
    })

    app.use('/usuarios', usuarios)
    app.use('/admin', admin)
// Outros
    const Port = 8081
    app.listen (Port, () => {
        console.log("Servidor rodando!")
    })
