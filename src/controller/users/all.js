const User = require('./../../model/user')

module.exports = (req, res) => {
    User
        .find({})
        .then(users => {
            return res.render('users/index', {
                user: req.user || null,
                users: users
            })
        })
        .catch(error => {
            console.log(error)
        })
}