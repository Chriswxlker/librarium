const express = require('express');
const router = express.Router();
const booksController = require('../controllers/books.controller');
const { isAuthenticated } = require('../middlewares/auth');
const { isAdmin, isLibrarian } = require('../middlewares/roles');

// Middleware combinado para admin o bibliotecario
function isLibrarianOrAdmin(req, res, next) {
    if (req.session && req.session.user && (req.session.user.role === 'admin' || req.session.user.role === 'librarian')) {
        return next();
    }
    return res.status(403).render('unauthorized', { message: 'Acceso solo para administradores o bibliotecarios.', user: req.session.user, titulo: 'Acceso denegado' });
}

// Listar libros activos
router.get('/', isAuthenticated, booksController.list);
// Listar libros inactivos
router.get('/inactive', isAdmin, booksController.listInactive);
// Mostrar formulario de agregar libro
router.get('/add', isLibrarianOrAdmin, booksController.showAddForm);
// Agregar libro
router.post('/add', isLibrarianOrAdmin, booksController.add);
// Mostrar formulario de edición
router.get('/edit/:id', isLibrarianOrAdmin, booksController.showEditForm);
// Editar libro
router.post('/edit/:id', isLibrarianOrAdmin, booksController.edit);
// Desactivar libro
router.post('/deactivate/:id', isAdmin, booksController.deactivate);
// Activar libro
router.post('/activate/:id', isAdmin, booksController.activate);

module.exports = router;
