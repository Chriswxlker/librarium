const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index', { 
        titulo: 'Bienvenido a Librarium', 
        encabezado: 'Página principal de Librarium'
    });
});

router.get('/dashboard', (req, res) => {
    res.render('dashboard', {
        titulo: 'Dashboard',
        encabezado: 'Dashboard de Librarium'
    });
});

module.exports = router;