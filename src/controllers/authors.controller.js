const Author = require('../models/author.model');

// Listar autores (HTML o JSON para AJAX, ahora con paginación)
exports.list = async (req, res) => {
    const search = req.query.search || '';
    const filterState = req.query.state ?? '';
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const { authors, total } = await Author.getAll(search, filterState, page, limit);
    const totalPages = Math.ceil(total / limit);
    if (req.xhr || req.headers.accept.indexOf('json') > -1) {
        return res.json({ authors, totalPages, page });
    }
    res.render('authors/list.ejs', { authors, pagina: 'dashboard', titulo: 'Listado de Autores', search, filterState, totalPages, page });
};

// Mostrar formulario de agregar
exports.showAddForm = (req, res) => {
    res.render('authors/add.ejs', { pagina: 'dashboard', titulo: 'Agregar Autor' });
};

// Agregar autor (ahora recibe state)
exports.add = async (req, res) => {
    const { name, state } = req.body;
    await Author.create(name, state);
    res.redirect('/authors');
};

// Mostrar formulario de editar
exports.showEditForm = async (req, res) => {
    const author = await Author.getById(req.params.id);
    res.render('authors/edit.ejs', { author, pagina: 'dashboard', titulo: 'Editar Autor' });
};

// Editar autor (ahora recibe state)
exports.edit = async (req, res) => {
    const { name, state } = req.body;
    await Author.update(req.params.id, name, state);
    res.redirect('/authors');
};

// Eliminar autor
exports.delete = async (req, res) => {
    await Author.delete(req.params.id);
    res.redirect('/authors');
};