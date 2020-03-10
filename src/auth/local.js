const LocalStrategy = require('passport-local')
const User = require('./../model/user')

module.exports = (passport) => {

    passport.serializeUser((user, cb) => {
        return cb(null, user._id)
    })

    passport.deserializeUser((id, cb) => {
        User
            .findById(id)
            .then(user => cb(null, user))
            .catch(error => cb(error, {}))
    })

    /** Registro do usuário */
    passport.use('local-signup', new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true
    },
        function (req, username, password, cb) {
            User
                .findOne({username: username})
                .then(userExist => {
                    if (!userExist) {
                        let user = new User(req.body)
                        user.password = user.genHash(user.password)
                        return user
                            .save()
                            .then(resUser => {
                                return cb(null, resUser)
                            })
                            .catch(error => {
                                console.log(error)
                                return
                            })
                    }
                    return cb(null, false)
                })
                .catch(error => {
                    return cb(error, false)
                })
        }
    ))

    /** Login do usuário */
    passport.use('local-signin', new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true
    },
        function (req, username, password, cb) {
            User
                .findOne({username})
                .then((user) => {
                    if (!user) {
                        return cb(null, false)
                    }

                    user.validateUser(password, (err, result) => {
                        if (!result || err) {
                            return cb(null, false)
                        }
                        return cb(null, user)
                    })
                })
        }
    ))
}