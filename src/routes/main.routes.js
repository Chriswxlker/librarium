const express = require('express');
const router = express.Router();
const { isAdmin } = require('../middlewares/roles');

router.get('/', (req, res) => {
    res.render('index', { 
        titulo: 'Bienvenido a Librarium',
        pagina: 'inicio',
        user: req.session.user // Pasa el usuario a la vista para el header
    });
});

router.get('/dashboard', isAdmin, (req, res) => {
    res.render('dashboard', { 
        titulo: 'Dashboard',
        encabezado: 'Dashboard',
        pagina: 'dashboard',
        user: req.session.user // Pasa el usuario autenticado a la vista
    });
});

module.exports = router;