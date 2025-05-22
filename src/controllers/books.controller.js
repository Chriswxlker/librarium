const Book = require('../models/book.model');
const Author = require('../models/author.model');
const Category = require('../models/category.model');
const Publisher = require('../models/publisher.model');

// Listar libros activos con paginación y búsqueda
exports.list = async (req, res) => {
    const search = req.query.search || '';
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    let books, total;
    if (search) {
        books = await Book.search(search, limit, (page - 1) * limit);
        total = await Book.countSearch(search);
    } else {
        books = await Book.getAll(limit, (page - 1) * limit);
        total = await Book.countAll();
    }
    const totalPages = Math.ceil(total / limit);
    res.render('books/list.ejs', { books, search, totalPages, page, titulo: 'Libros', pagina: 'dashboard' });
};

// Listar libros inactivos
exports.listInactive = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const books = await Book.getInactive(limit, (page - 1) * limit);
    const total = await Book.countInactive();
    const totalPages = Math.ceil(total / limit);
    res.render('books/inactive.ejs', { books, totalPages, page, titulo: 'Libros Inactivos', pagina: 'dashboard' });
};

// Mostrar formulario de agregar libro
exports.showAddForm = async (req, res) => {
    const authors = await Author.getAll('', '1', 1, 100).then(r => r.authors || r);
    const categories = await Category.getAll('', '1', 1, 100).then(r => r.categories || r);
    const publishers = await Publisher.getAll('', '1', 1, 100).then(r => r.publishers || r);
    res.render('books/add.ejs', { authors, categories, publishers, pagina: 'dashboard', titulo: 'Agregar Libro' });
};

// Agregar libro
exports.add = async (req, res) => {
    const { name, id_author, isbn, year_published, num_pages, id_category, id_publisher } = req.body;
    await Book.create({ name, id_author, isbn, year_published, num_pages, id_category, id_publisher });
    res.redirect('/books');
};

// Mostrar formulario de edición
exports.showEditForm = async (req, res) => {
    const book = await Book.getById(req.params.id);
    const authors = await Author.getAll('', '1', 1, 100).then(r => r.authors || r);
    const categories = await Category.getAll('', '1', 1, 100).then(r => r.categories || r);
    const publishers = await Publisher.getAll('', '1', 1, 100).then(r => r.publishers || r);
    res.render('books/edit.ejs', { book, authors, categories, publishers, pagina: 'dashboard', titulo: 'Editar Libro' });
};

// Editar libro
exports.edit = async (req, res) => {
    const { name, id_author, isbn, year_published, num_pages, id_category, id_publisher } = req.body;
    await Book.update(req.params.id, { name, id_author, isbn, year_published, num_pages, id_category, id_publisher });
    res.redirect('/books');
};

// Desactivar libro
exports.deactivate = async (req, res) => {
    await Book.setState(req.params.id, 0);
    res.redirect('/books');
};

// Activar libro
exports.activate = async (req, res) => {
    await Book.setState(req.params.id, 1);
    res.redirect('/books/inactive');
};
