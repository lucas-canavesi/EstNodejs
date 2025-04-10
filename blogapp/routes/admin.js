const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
require('../models/Categoria')
const Categoria = mongoose.model('categorias')
require('../models/Postagem')
const Postagem = mongoose.model('postagens')
const {eAdmin} = require('../helpers/eAdmin')

router.get('/', eAdmin, (req, res) => {
    res.render('admin/index')
})

router.get('/posts', eAdmin, (req, res) => {
    res.send("Pagina de posts!")
})

router.get('/categorias', eAdmin,(req, res) => {
    Categoria.find().sort({date: 'desc'}).lean().then((categorias) => {
        res.render('admin/categorias', {categorias: categorias})
    }).catch((erro) => {
        req.flash("error_msg", "Houve um erro ao listar as categoria!")
        res.redirect('/admin')
    })
   
})

router.get('/categorias/add', eAdmin,(req, res) => {
    res.render("admin/addcategorias")
})

router.post('/categorias/nova', eAdmin,(req, res) => {
    var erros = []
    if (!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null) {
        erros.push({texto: "Nome inválido!"})
    }
    if (!req.body.slug || typeof req.body.slug == undefined || req.body.slug == null) {
        erros.push({texto: "Slug inválido!"})
    }
    if (req.body.nome.length < 2){
        erros.push({texto: "Nome muito pequeno!"})
    }
    if(erros.length > 0) {
        res.render('admin/addcategorias', {erros: erros})
    } else 
    {
        const novaCategoria = {
            name: req.body.nome,
            slug: req.body.slug
        }
        new Categoria(novaCategoria).save().then(() => {
            req.flash("success_msg", "Categoria criada com sucesso!")
            res.redirect('/admin/categorias')
            console.log("salvo com sucesso")
        }).catch((erro) => {
            req.flash("error_msg", "Houve um erro ao salvar a categoria, tente novamente!")
            res.redirect('/admin')
        })
    }
    
})

router.get('/categorias/edit/:id', eAdmin,(req, res) => {
    Categoria.findOne({_id:req.params.id}).lean().then((categorias) => {
        res.render('admin/editcategorias', {categorias: categorias})
    }).catch((erro) => {
        req.flash("error_msg", "Está categoria não existe!")
        res.render('/admin/categorias')
    })
})
router.post('/categorias/edit', eAdmin,(req, res) => {
    Categoria.findOne({_id:req.body.id}).then((categorias) => {
        categorias.name = req.body.nome
        categorias.slug = req.body.slug
        categorias.save().then(() => {
            req.flash("success_msg", "Categoria editada com sucesso!")
            res.redirect('/admin/categorias')
        }).catch((erro) => {
            req.flash("error_msg", "Houve um erro ao salvar")
            res.redirect('/admin/categorias')
        })
    }).catch((erro) => {
        req.flash("error_msg", "Houve um erro ao editar!")
        res.redirect('/admin/categorias')
    })
})
router.post('/categorias/deletar', eAdmin,(req, res) => {
    Categoria.deleteOne({_id: req.body.id}).then(() => {
        req.flash("success_msg", "Categoria deletada com sucesso!")
        res.redirect('/admin/categorias')
    }).catch((erro) => {
        req.flash("succes_msg", "Houve um erro ao deletar a Categoria!")
        res.redirect('/admin/categorias')
    })
})

router.get('/postagens', eAdmin,(req, res) => {
    Postagem.find().lean().populate('categorias').sort({data: 'desc'}).then((postagens) => {
        res.render('admin/postagens', {postagens: postagens})
    }).catch((error) => {
        req.flash("error_msg", "Erro ao carregar postagens!")
        res.redirect('/admin')
    })
})

router.get('/postagens/add', eAdmin,(req, res) => {
    Categoria.find().lean().then((categorias) => {
        res.render('admin/addpostagens', {categorias: categorias})
    }).catch((error) => {
        req.flash("error_msg", "Houve um erro ao carregar o formulario!")
        res.redirect('/admin')
    })
})

router.post('/postagens/nova', eAdmin,(req, res) => {
    var erros = []
    if (req.body.categorias == "0") {
        erros.push({texto: "Categoria inválida, registre uma categoria"})
    }
    if (erros.length > 0) {
        res.render('/admin/addpostagens', {erros: erros})
    } 
    else {
        const novaPostagem = {
            titulo: req.body.titulo,
            slug: req.body.slug,
            descricao: req.body.descricao,
            conteudo: req.body.conteudo,
            categorias: req.body.categorias
        }
        new Postagem(novaPostagem).save().then(() => {
            req.flash("success_msg", "Postagem criada com sucesso!")
            res.redirect('/admin/postagens')
        }).catch((eror) => {
            req.flash("error_msg", "Houve um erro durante o salvamento da postagem!")
            res.redirect('/admin/postagens')
        })
    }
})

router.get('/postagens/edit/:id', eAdmin,(req, res) => {
    Postagem.findOne({_id: req.params.id}).lean().then((postagens) => {
        Categoria.find().lean().then((categorias) => {
            res.render('admin/editpostagens', {categorias: categorias, postagens: postagens})
        }).catch((error) => {
            req.flash("error_msg", "Houve um erro ao listar as categorias.")
            res.redirect('admin/postagens')
        })
    }).catch((error) => {
        req.flash("error_msg", "Houve um erro ao carregar o formulário de edição")
        res.redirect('admin/postagens')
    })
})

router.post('/postagens/edit', eAdmin,(req, res) => {
    Postagem.findOne({_id: req.body.id}).then((postagens) => {
        postagens.titulo = req.body.titulo
        postagens.slug = req.body.slug
        postagens.descricao = req.body.descricao
        postagens.conteudo = req.body.conteudo
        postagens.categorias = req.body.categorias
        postagens.save().then(() => {
            req.flash("success_msg", "Postagem editada com sucesso!")
            res.redirect('/admin/postagens')
        }).catch((error) => {
            console.log(error)
            req.flash("error_msg", "Houve um erro ao salvar")
            res.redirect('/admin/postagens')
        })
    }).catch((error) => {
        console.log(error)
        req.flash("error_msg", "Houve um erro ao salvar a edição!")
        res.redirect('/admin/postagens')
    })
})

router.get('/postagens/deletar/:id', eAdmin,(req, res) => {
    Postagem.deleteOne({_id: req.params.id}).then(() => {
        res.redirect('/admin/postagens')
    })
})



module.exports = router

