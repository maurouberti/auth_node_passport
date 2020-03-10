const express = require('express')
const router = express.Router()
const isAuth = require('../../auth/middleware')

module.exports = (passport) => {

    router.get('/new', require('./new'))
    router.post('/', passport.authenticate('local-signup', {
        successRedirect: '/users',
        failureRedirect: '/users/new'
    }))
    // router.post('/', require('./create'))
    router.get('/', isAuth, require('./all'))
    router.delete('/:id', isAuth, require('./remove'))
    
    return router
}
