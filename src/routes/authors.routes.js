const express = require('express');
const router = express.Router();
const controller = require('../controllers/authors.controller');

router.get('/', controller.list);
router.get('/add', controller.showAddForm);
router.post('/add', controller.add);
router.get('/edit/:id', controller.showEditForm);
router.post('/edit/:id', controller.edit);
router.post('/delete/:id', controller.delete);

module.exports = router;