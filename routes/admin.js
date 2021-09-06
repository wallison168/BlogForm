const express = require('express')
const router = express.Router() //Mecanimos utilizado para gerar rotas em arquivos diferentes
const mongoose = require('mongoose')
require('../models/Categoria') //essa função esta pontando o diretorio para o arquivo que esta contido dentro da pasta models
const Categoria = mongoose.model('categorias') //esta passando o modelo do mongodb para dentro da variavel constante 

router.get('/', (req, res) => {
    res.render('admin/index')
})

router.get('/posts', (req, res) => {
    res.send('Listagem de posts')
})

router.get('/categorias', (req, res) => {
    res.render('admin/categorias')
})

router.get('/categorias/add', (req, res) => {
    res.render('admin/addcategorias')
})

router.post('/categorias/nova', (req, res) => {
    const erros = []

    if(!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null){ //definindo uma mensagem de erro caso o usuario insira valores errado
        erros.push({texto: 'Nome Invalido'})
    }
    if(!req.body.slug || typeof req.body.slug == undefined || req.body.slug == null){ 
        erros.push({texto: 'Slug Invalido'})
    }

    if (erros.length > 0){
        res.render('admin/addcategorias', {erros: erros})
    }

    const novaCategoria = {
        nome: req.body.nome,
        slug: req.body.slug
    }

    new Categoria(novaCategoria).save().then(() => {
        console.log('nova categoria cadastrada')
    }).catch((err) => {
        console.log(`erro ao cadastrar a nova categoria : ${err}`)
    })
})

module.exports = router
