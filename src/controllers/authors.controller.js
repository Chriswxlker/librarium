const Author = require('../models/author.model');

// Listar autores
exports.list = async (req, res) => {
    const authors = await Author.getAll();
    res.render('authors/list.ejs', { authors, pagina: 'dashboard', titulo: 'Listado de Autores' });
};

// Mostrar formulario de agregar
exports.showAddForm = (req, res) => {
    res.render('authors/add.ejs', { pagina: 'dashboard', titulo: 'Agregar Autor' });
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
    res.render('authors/edit.ejs', { author, pagina: 'dashboard', titulo: 'Editar Autor' });
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