module.exports = app => {
    app.post('/signup', app.api.user.save)
    app.post('/signin', app.api.auth.signin)
    app.post('/validateToken', app.api.auth.validateToken)

    app.route('/users')
    .all(app.config.passport.authenticate())   
    .post(app.api.user.save)
    .get(app.api.user.get)

app.route('/users/:id')
    .all(app.config.passport.authenticate())   
    .put(app.api.user.save)
    .get(app.api.user.getById)
    .delete(app.api.user.remove)
    
    app.route('/itens')
       .all(app.config.passport.authenticate())   
       .post(app.api.iten.save)
       .get(app.api.iten.get)

    app.route('/itens/:id')
        .all(app.config.passport.authenticate())
        .put(app.api.iten.save)
        .delete(app.api.iten.remove)
}