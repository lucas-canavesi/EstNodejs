const mongoose = require('mongoose')
const Schema = mongoose.Schema  // Facilitar a digitação

const Categoria = new Schema ({
    name: {
        type: String,
        require: true
    },
    slug: {
        type: String,
        require: true
    },
    date: {
        type: Date,
        default: Date.now()
    }
})

mongoose.model('categorias', Categoria)