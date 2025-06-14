const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');
const app = express();

// Configura EJS como motor de vistas
app.set('view engine', 'ejs');
app.set('views', './src/views');
app.use(expressLayouts);
app.use(express.static(__dirname + '/src/public'));
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: 'librarium_secret',
    resave: false,
    saveUninitialized: false
}));

// Importa las rutas
const mainRoutes = require('./src/routes/main.routes');
app.use('/', mainRoutes);

const authorsRoutes = require('./src/routes/authors.routes');
app.use('/authors', authorsRoutes);

const publishersRoutes = require('./src/routes/publishers.routes');
app.use('/publishers', publishersRoutes);

const categoriesRoutes = require('./src/routes/categories.routes');
app.use('/categories', categoriesRoutes);

const booksRoutes = require('./src/routes/books.routes');
app.use('/books', booksRoutes);

const usersRoutes = require('./src/routes/users.routes');
app.use('/users', usersRoutes);

const authRoutes = require('./src/routes/auth.routes');
app.use('/', authRoutes);

const loansRoutes = require('./src/routes/loans.routes');
app.use('/loans', loansRoutes);

module.exports = app;