// Middleware para verificar si el usuario es administrador
function isAdmin(req, res, next) {
    if (req.session && req.session.user && req.session.user.role === 'admin') {
        return next();
    }
    return res.status(403).render('unauthorized', { message: 'Acceso solo para administradores.' });
}

module.exports = { isAdmin };
