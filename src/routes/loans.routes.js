const express = require('express');
const router = express.Router();
const loansController = require('../controllers/loans.controller');
const { isUser, isLibrarian, isAdmin } = require('../middlewares/roles');

// Middleware para admin o bibliotecario
function isLibrarianOrAdmin(req, res, next) {
    if (req.session && req.session.user && (req.session.user.role === 'librarian' || req.session.user.role === 'admin')) {
        return next();
    }
    return res.status(403).render('unauthorized', { message: 'Acceso solo para bibliotecarios o administradores.', user: req.session.user, titulo: 'Acceso denegado' });
}

// Usuario: solicitar préstamo
router.get('/add', isUser, loansController.addForm);
router.post('/add', isUser, loansController.requestLoan);
router.get('/my', isUser, loansController.myLoans);

// Bibliotecario o admin: gestión de préstamos
router.get('/', isLibrarianOrAdmin, loansController.list);
router.post('/:id/status', isLibrarianOrAdmin, loansController.updateStatus);
router.post('/:id/return', isLibrarianOrAdmin, loansController.returnLoan);

// Bibliotecario o admin: asignar préstamo
router.get('/assign', isLibrarianOrAdmin, loansController.assignForm);
router.post('/assign', isLibrarianOrAdmin, loansController.assign);

module.exports = router;
