const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users.controller');
const { isAdmin } = require('../middlewares/roles');

// Listar usuarios activos
router.get('/', isAdmin, usersController.list);
// Listar usuarios inactivos
router.get('/inactive', isAdmin, usersController.listInactive);
// Formulario para agregar usuario
router.get('/add', isAdmin, usersController.addForm);
// Crear usuario
router.post('/add', isAdmin, usersController.add);
// Formulario para editar usuario
router.get('/edit/:id', isAdmin, usersController.editForm);
// Editar usuario
router.post('/edit/:id', isAdmin, usersController.edit);
// Cambiar estado activo/inactivo
router.post('/toggle-status/:id', isAdmin, usersController.toggleStatus);

module.exports = router;
