module.exports = (req, res, next) => {
    // return next()
    if (req.isAuthenticated()) return next()
    return res.redirect('/auth')
}