const Publisher = require('../models/publisher.model');

// Listar editoriales activas
exports.list = async (req, res) => {
    const search = req.query.search || '';
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const { publishers, total } = await Publisher.getAll(search, '1', page, limit);
    const totalPages = Math.ceil(total / limit);
    if (req.xhr || req.headers.accept?.includes('application/json')) {
        res.json({ publishers, page, totalPages });
    } else {
        res.render('publishers/list', { 
            publishers, 
            pagina: 'dashboard', 
            titulo: 'Listado de Editoriales', 
            search, 
            filterState: '', 
            totalPages, 
            page,
            user: req.session.user // <-- Asegura que user esté disponible en la vista
        });
    }
};

// Listar editoriales inactivas
exports.listInactive = async (req, res) => {
    const search = req.query.search || '';
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const { publishers, total } = await Publisher.getAll(search, '0', page, limit);
    const totalPages = Math.ceil(total / limit);
    if (req.xhr || req.headers.accept?.includes('application/json')) {
        res.json({ publishers, page, totalPages });
    } else {
        res.render('publishers/inactive', { 
            publishers, 
            pagina: 'dashboard', 
            titulo: 'Editoriales Inactivas', 
            search, 
            totalPages, 
            page,
            filterState: '',
            user: req.session.user // <-- Asegura que user esté disponible en la vista
        });
    }
};

// Mostrar formulario de agregar
exports.showAddForm = (req, res) => {
    res.render('publishers/add', {
        pagina: 'dashboard',
        titulo: 'Agregar Editorial',
        user: req.session.user
    });
};

// Agregar editorial
exports.add = async (req, res) => {
    const { name } = req.body;
    await Publisher.create(name, 1);
    res.redirect('/publishers');
};

// Mostrar formulario de editar
exports.showEditForm = async (req, res) => {
    const publisher = await Publisher.getById(req.params.id);
    res.render('publishers/edit', {
        publisher,
        pagina: 'dashboard',
        titulo: 'Editar Editorial',
        user: req.session.user
    });
};

// Editar editorial
exports.edit = async (req, res) => {
    const { name } = req.body;
    await Publisher.update(req.params.id, name, req.body.state || 1);
    res.redirect('/publishers');
};

// Desactivar editorial
exports.deactivate = async (req, res) => {
    await Publisher.deactivate(req.params.id);
    res.redirect('/publishers');
};

// Activar editorial
exports.activate = async (req, res) => {
    await Publisher.activate(req.params.id);
    res.redirect('/publishers/inactive');
};
