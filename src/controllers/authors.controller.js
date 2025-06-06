const Author = require('../models/author.model');

// Listar autores activos
exports.list = async (req, res) => {
    const search = req.query.search || '';
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const { authors, total } = await Author.getAll(search, '1', page, limit);
    const totalPages = Math.ceil(total / limit);
    res.render('authors/list.ejs', { authors, pagina: 'dashboard', titulo: 'Listado de Autores', search, filterState: '', totalPages, page, user: req.session.user });
};

// Listar autores inactivos
exports.listInactive = async (req, res) => {
    const search = req.query.search || '';
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const { authors, total } = await Author.getAll(search, '0', page, limit);
    const totalPages = Math.ceil(total / limit);
    res.render('authors/inactive.ejs', { authors, pagina: 'dashboard', titulo: 'Autores Inactivos', search, totalPages, page, user: req.session.user });
};

// Mostrar formulario de agregar
exports.showAddForm = (req, res) => {
    res.render('authors/add.ejs', { pagina: 'dashboard', titulo: 'Agregar Autor', user: req.session.user });
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
    res.render('authors/edit.ejs', { author, pagina: 'dashboard', titulo: 'Editar Autor', user: req.session.user });
};

// Editar autor (ahora recibe state)
exports.edit = async (req, res) => {
    const { name, state } = req.body;
    await Author.update(req.params.id, name, state);
    res.redirect('/authors');
};

// Desactivar autor
exports.deactivate = async (req, res) => {
    await Author.deactivate(req.params.id);
    res.redirect('/authors');
};

// Activar autor
exports.activate = async (req, res) => {
    await Author.activate(req.params.id);
    res.redirect('/authors/inactive');
};

// Eliminar autor
exports.delete = async (req, res) => {
    await Author.delete(req.params.id);
    res.redirect('/authors');
};