const express = require('express');
const router = express.Router();
const controller = require('../controllers/categories.controller');

router.get('/', controller.list);
router.get('/inactive', controller.listInactive);
router.get('/add', controller.showAddForm);
router.post('/add', controller.add);
router.get('/edit/:id', controller.showEditForm);
router.post('/edit/:id', controller.edit);
router.post('/deactivate/:id', controller.deactivate);
router.post('/activate/:id', controller.activate);

module.exports = router;