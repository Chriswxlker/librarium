const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const app = express();

// Configura EJS como motor de vistas
app.set('view engine', 'ejs');
app.set('views', './src/views');
app.use(expressLayouts);
app.use(express.static(__dirname + '/src/public'));
app.use(express.urlencoded({ extended: true }));

// Importa las rutas
const mainRoutes = require('./src/routes/main.routes');
app.use('/', mainRoutes);

const authorsRoutes = require('./src/routes/authors.routes');
app.use('/authors', authorsRoutes);

module.exports = app;