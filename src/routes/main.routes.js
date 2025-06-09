const express = require('express');
const router = express.Router();
const { isAdmin, isLibrarian } = require('../middlewares/roles');

// Middleware combinado para admin o bibliotecario
function isLibrarianOrAdmin(req, res, next) {
    if (req.session && req.session.user && (req.session.user.role === 'admin' || req.session.user.role === 'librarian')) {
        return next();
    }
    return res.status(403).render('unauthorized', { message: 'Acceso solo para administradores o bibliotecarios.', user: req.session.user, titulo: 'Acceso denegado' });
}

router.get('/', (req, res) => {
    res.render('index', { 
        titulo: 'Bienvenido a Librarium',
        pagina: 'inicio',
        user: req.session.user // Pasa el usuario a la vista para el header
    });
});

// Middleware combinado para admin, bibliotecario o usuario normal
function isAnyRole(req, res, next) {
    if (req.session && req.session.user && ['admin', 'librarian', 'user'].includes(req.session.user.role)) {
        return next();
    }
    return res.status(403).render('unauthorized', { message: 'Acceso solo para usuarios registrados.', user: req.session.user, titulo: 'Acceso denegado' });
}

router.get('/dashboard', isAnyRole, (req, res) => {
    res.render('dashboard', { 
        titulo: 'Dashboard',
        encabezado: 'Dashboard',
        pagina: 'dashboard',
        user: req.session.user // Pasa el usuario autenticado a la vista
    });
});

module.exports = router;