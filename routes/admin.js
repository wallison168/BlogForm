const express = require('express')
const router = express.Router() //Mecanimos utilizado para gerar rotas em arquivos diferentes

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

module.exports = router