module.exports = (req, res) => {
    // return res.json({msg: 'TESTE'})
    return res.render('main/index', {
        user: req.user || null
    })
}