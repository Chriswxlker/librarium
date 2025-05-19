const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index', { 
        titulo: 'Bienvenido a Librarium',
        pagina: 'inicio'
    });
});

router.get('/dashboard', (req, res) => {
    res.render('dashboard', { 
        titulo: 'Dashboard',
        encabezado: 'Dashboard',
        pagina: 'dashboard'
    });
});

module.exports = router;