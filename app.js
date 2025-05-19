const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const app = express();

// Configura EJS como motor de vistas
app.set('view engine', 'ejs');
app.set('views', __dirname + '/src/views');
app.use(expressLayouts);
app.use(express.static(__dirname + '/src/public'));

// Importa las rutas
const mainRoutes = require('./src/routes/main.routes');
app.use('/', mainRoutes);

module.exports = app;