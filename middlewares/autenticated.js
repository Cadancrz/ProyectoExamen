

const requireAuth = (req, resp, next)=> {
    // logica
    if (req.session.loggedIn) {
        return next();
    }
    resp.redirect('/');
}

module.exports = requireAuth;