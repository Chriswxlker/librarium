// Middleware para verificar si el usuario es administrador
function isAdmin(req, res, next) {
    if (req.session && req.session.user && req.session.user.role === 'admin') {
        return next();
    }
    return res.status(403).render('unauthorized', { message: 'Acceso solo para administradores.', user: req.session.user, titulo: 'Acceso denegado' });
}

// Middleware para verificar si el usuario es bibliotecario
function isLibrarian(req, res, next) {
    if (req.session && req.session.user && req.session.user.role === 'librarian') {
        return next();
    }
    return res.status(403).render('unauthorized', { message: 'Acceso solo para bibliotecarios.', user: req.session.user, titulo: 'Acceso denegado' });
}

// Middleware para verificar si el usuario es usuario normal
function isUser(req, res, next) {
    if (req.session && req.session.user && req.session.user.role === 'user') {
        return next();
    }
    return res.status(403).render('unauthorized', { message: 'Acceso solo para usuarios registrados.', user: req.session.user, titulo: 'Acceso denegado' });
}

module.exports = { isAdmin, isLibrarian, isUser };