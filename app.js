//Carregando Modulos

    const express = require('express')
    const handlebars = require('express-handlebars')
    const app = express()
    const admin = require('./routes/admin')
    const path = require('path')
    const mongoose = require('mongoose')
    const session = require('express-session')
    const flash = require('connect-flash')

//Configurações 
    //session 

        app.use(session({
            secret: 'cursonode',
            resave: true,
            saveUninitialized: true
        }))
        app.use(flash())

    //middleware

        app.use((req,res, next) => {
            res.locals.succes_msg = req.flash('succes_msg')
            res.locals.error_msg = req.flash('error_msg')
            next()
        })

    //Body-parser

        app.use(express.json())
        app.use(express.urlencoded({extended: true}))
    
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
