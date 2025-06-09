// Controlador para gestión de usuarios (solo admin)
const User = require('../models/user.model');
const bcrypt = require('bcryptjs');

const usersController = {
    // Listar todos los usuarios
    list: async (req, res) => {
        const search = req.query.search || '';
        const page = parseInt(req.query.page) || 1;
        const limit = 10;
        let users, total;
        if (search) {
            users = await User.search(search, 1, page, limit);
            total = await User.countSearch(search, 1);
        } else {
            users = await User.getAll(1, page, limit);
            total = await User.countAll(1);
        }
        const totalPages = Math.ceil(total / limit);
        res.render('users/list', { users, search, totalPages, page, titulo: 'Usuarios', pagina: 'dashboard', user: req.session.user });
    },

    // Mostrar formulario para agregar usuario
    addForm: (req, res) => {
        res.render('users/add', { titulo: 'Agregar usuario', pagina: 'dashboard', user: req.session.user });
    },

    // Crear usuario
    add: async (req, res) => {
        let { name, email, password, role } = req.body;
        if (role === 'bibliotecario') role = 'librarian';
        if (role === 'usuario') role = 'user';
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({ name, email, password: hashedPassword, role, status: 1 });
        res.redirect('/users');
    },

    // Mostrar formulario para editar usuario
    editForm: async (req, res) => {
        const user = await User.getById(req.params.id);
        res.render('users/edit', { user, user: req.session.user, pagina: 'dashboard', titulo: 'Editar usuario' });
    },

    // Editar usuario
    edit: async (req, res) => {
        let { name, email, role, status } = req.body;
        if (role === 'bibliotecario') role = 'librarian';
        if (role === 'usuario') role = 'user';
        await User.update(req.params.id, { name, email, role, status });
        res.redirect('/users');
    },

    // Cambiar estado (activo/inactivo)
    toggleStatus: async (req, res) => {
        const user = await User.getById(req.params.id);
        const newStatus = user.status === 1 ? 0 : 1;
        await User.setStatus(req.params.id, newStatus);
        res.redirect('/users');
    },

    // Listar usuarios inactivos con paginación y búsqueda
    listInactive: async (req, res) => {
        const search = req.query.search || '';
        const page = parseInt(req.query.page) || 1;
        const limit = 10;
        let users, total;
        if (search) {
            users = await User.search(search, 0, page, limit);
            total = await User.countSearch(search, 0);
        } else {
            users = await User.getAll(0, page, limit);
            total = await User.countAll(0);
        }
        const totalPages = Math.ceil(total / limit);
        res.render('users/inactive', { users, search, totalPages, page, titulo: 'Usuarios inactivos', pagina: 'dashboard', user: req.session.user });
    }
};

module.exports = usersController;
