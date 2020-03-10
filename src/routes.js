module.exports = (app, passport) => {
    const controllerMain = require('./controller/main/index')
    app.use('/', controllerMain)

    const controllerUser = require('./controller/users/index')
    app.use('/users', controllerUser(passport))

    const controllerAuth = require('./controller/auth/index')
    app.use('/auth', controllerAuth(passport))
}
