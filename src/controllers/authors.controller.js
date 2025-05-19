const Author = require('../models/author.model');

// Listar autores
exports.list = async (req, res) => {
    const authors = await Author.getAll();
    res.render('authors/list.authors', { authors, pagina: 'dashboard' });
};

// Mostrar formulario de agregar
exports.showAddForm = (req, res) => {
    res.render('authors/add.authors', { pagina: 'dashboard' });
};

// Agregar autor
exports.add = async (req, res) => {
    const { name } = req.body;
    await Author.create(name);
    res.redirect('/authors');
};

// Mostrar formulario de editar
exports.showEditForm = async (req, res) => {
    const author = await Author.getById(req.params.id);
    res.render('authors/edit.authors', { author, pagina: 'dashboard' });
};

// Editar autor
exports.edit = async (req, res) => {
    const { name } = req.body;
    await Author.update(req.params.id, name);
    res.redirect('/authors');
};

// Eliminar autor
exports.delete = async (req, res) => {
    await Author.delete(req.params.id);
    res.redirect('/authors');
};