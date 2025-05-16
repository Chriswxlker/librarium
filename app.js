const express = require('express');
const app = express();

// Configura EJS como motor de vistas
app.set('view engine', 'ejs');
app.set('views', __dirname + '/src/views');

// Importa las rutas
const mainRoutes = require('./src/routes/main.routes');
app.use('/', mainRoutes);

module.exports = app;