const express = require('express');
const app = express();

// Configura EJS como motor de vistas
app.set('view engine', 'ejs');
app.set('views', __dirname + '/src/views');

// ...aquí puedes agregar tus rutas...
// En tu archivo de rutas o en app.js
app.get('/', (req, res) => {
    res.render('index', { titulo: 'Bienvenido a Librarium' });
});

module.exports = app;