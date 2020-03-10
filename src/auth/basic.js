const BasicStrategy = require('passport-http').BasicStrategy

module.exports = new BasicStrategy(
    function (user, pass, cb) {
        if (user === 'admin' && pass === 'admin')
            return cb(null, true)
        else
            return cb(null, false)
    }
)