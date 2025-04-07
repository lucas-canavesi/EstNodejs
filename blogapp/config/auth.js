const localStrategy = require('passport-local').Strategy
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

//Model de usuário
require('../models/Usuario')
const Usuario = mongoose.model('usuarios')

module.exports = function(passport){
    passport.use(new localStrategy({usernameField: 'email', passwordField: 'senha'}, (email, senha, done) => {
        Usuario.findOne({email:email}).then((usuarios) => {
            if(!usuarios){
                return done(null, false, {message: "Está conta não existe!"})
            }
            bcrypt.compare(senha, usuarios.senha, (erro, batem) => {
                if(batem){
                    return done(null, usuarios)
                }else{
                    return done(null, false, {message: "Senha incorreta!"})
                }
            })
        })
    }))
    passport.serializeUser((usuarios, done) => {
        done(null, usuarios._id)
    })
    passport.deserializeUser((id, done) => {
        Usuario.findById(id).lean().then((usuarios) => {
            done(null, usuarios)
        }).catch((error) => {
            done(null, false, {message: "Algo deu errado"})
        })
    })
}