//Carregando Modulos

    const express = require('express')
    const handlebars = require('express-handlebars')
    const app = express()
    const admin = require('./routes/admin')
    const path = require('path')
    const mongoose = require('mongoose')

//Configurações 
    //Body-parser

        app.use(express.urlencoded({extended: true}))
        app.use(express.json())
    
    //Handlebars

        app.set('views', path.join(__dirname, 'views')) //OBS: e nescessario apontar o diretorio da view antes de definir as config do handlebars
        app.engine('handlebars', handlebars({defaultLayout: 'main'}))
        app.set('view engine', 'handlebars')

    //Mongoose

        mongoose.connect('mongodb://localhost/blogapp').then(() => {
            console.log('conexão feita')
        }).catch((err) => {
            console.log(`erro na conexão : ${err}`)
        })

    //Public 

        app.use(express.static(path.join(__dirname, 'public'))) //Baicamente essa função ira pegar as funcionalidades dos arquivos contidos dentro da pasta public ou seja os arquivos estaticos 

//Rotas
    app.use('/admin', admin) //chamando a rota definida 
//Outros
app.listen(8081)
