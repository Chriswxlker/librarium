const express = require('express');
const router = express.Router();
const booksController = require('../controllers/books.controller');

// Listar libros activos
router.get('/', booksController.list);
// Listar libros inactivos
router.get('/inactive', booksController.listInactive);
// Mostrar formulario de agregar
router.get('/add', booksController.showAddForm);
// Agregar libro
router.post('/add', booksController.add);
// Mostrar formulario de edición
router.get('/edit/:id', booksController.showEditForm);
// Editar libro
router.post('/edit/:id', booksController.edit);
// Desactivar libro
router.post('/deactivate/:id', booksController.deactivate);
// Activar libro
router.post('/activate/:id', booksController.activate);

module.exports = router;
