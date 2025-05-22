const express = require('express');
const router = express.Router();
const controller = require('../controllers/publishers.controller');

// Listar editoriales
router.get('/', controller.list);
router.get('/inactive', controller.listInactive);

// Agregar editorial
router.get('/add', controller.showAddForm);
router.post('/add', controller.add);

// Editar editorial
router.get('/edit/:id', controller.showEditForm);
router.post('/edit/:id', controller.edit);

// Activar/Desactivar editorial
router.post('/deactivate/:id', controller.deactivate);
router.post('/activate/:id', controller.activate);

module.exports = router;
