const bodyParser = require('body-parser')
const express = require('express')
const session = require('express-session')
const methodOverride = require('method-override')
const morgan = require('morgan')
const mongoose = require('mongoose')
const path = require('path')
const passport = require('passport')

const app = express()

app.use(morgan('dev'))
app.use(bodyParser.urlencoded( {extended: false} ))
app.use(bodyParser.json())
app.use(methodOverride('_method'))

app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'src/view'))

/** PASSPORT BASIC (npm i passport-http) */
// passport.use(require('./src/auth/basic'))
// app.get('*', passport.authenticate('basic', {session: false}))

/** PASSPORT LOCAL (npm i passport-local express-session) */
require('./src/auth/local')(passport)

app.use(session({secret:'ASDFGHJK==', resave: false, saveUninitialized: true}))
app.use(passport.initialize())
app.use(passport.session())


const routes = require('./src/routes');
routes(app, passport);

mongoose.connect('mongodb://mongo:27017/auth', {
    useNewUrlParser: true, 
    useUnifiedTopology: true
})
mongoose.Promise = global.Promise

app.listen(3000, () => {
    console.log('servidor iniciado na porta 3000')
})