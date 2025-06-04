const express = require('express');
const router = express.Router();
const booksController = require('../controllers/books.controller');
const { isAuthenticated } = require('../middlewares/auth');

// Listar libros activos
router.get('/', isAuthenticated, booksController.list);
// Listar libros inactivos
router.get('/inactive', isAuthenticated, booksController.listInactive);
// Mostrar formulario de agregar
router.get('/add', isAuthenticated, booksController.showAddForm);
// Agregar libro
router.post('/add', isAuthenticated, booksController.add);
// Mostrar formulario de edición
router.get('/edit/:id', isAuthenticated, booksController.showEditForm);
// Editar libro
router.post('/edit/:id', isAuthenticated, booksController.edit);
// Desactivar libro
router.post('/deactivate/:id', isAuthenticated, booksController.deactivate);
// Activar libro
router.post('/activate/:id', isAuthenticated, booksController.activate);

module.exports = router;
