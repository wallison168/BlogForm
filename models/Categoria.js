const mongoose = require('mongoose')
const Schema = mongoose.Schema

const categoria = new Schema({
    nome: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now() //ira pegar a data em que a nova categoria foi criada 
    }
})

mongoose.model('categorias', categoria)
