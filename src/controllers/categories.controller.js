const Caterogy = require('../models/category.model');

//Listar categorias activas
exports.list = async (req, res) => {
    const search = req.query.search || '';
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const { categories, total } = await Caterogy.getAll(search, '1', page, limit);
    const totalPages = Math.ceil(total / limit);
    if (req.xhr || req.headers.accept?.includes('application/json')) {
        res.json({ categories, page, totalPages });
    } else {
        res.render('categories/list', { 
            categories, 
            pagina: 'dashboard', 
            titulo: 'Listado de Categorías', 
            search, 
            filterState: '', 
            totalPages, 
            page,
            user: req.session.user // <-- Asegura que user esté disponible en la vista
        });
    }
};

//Listar categorias inactivas
exports.listInactive = async (req, res) => {
    const search = req.query.search || '';
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const { categories, total } = await Caterogy.getAll(search, '0', page, limit);
    const totalPages = Math.ceil(total / limit);
    if (req.xhr || req.headers.accept?.includes('application/json')) {
        res.json({ categories, page, totalPages });
    } else {
        res.render('categories/inactive', { 
            categories, 
            pagina: 'dashboard', 
            titulo: 'Categorías Inactivas', 
            search, 
            totalPages, 
            page,
            user: req.session.user // <-- Asegura que user esté disponible en la vista
        });
    }
};

//Mostrar formulario de agregar
exports.showAddForm = (req, res) => {
    res.render('categories/add', {
        pagina: 'dashboard',
        titulo: 'Agregar Categoría',
        user: req.session.user
    });
};

//Agregar categoria
exports.add = async (req, res) => {
    const { name } = req.body;
    await Caterogy.create(name, 1);
    res.redirect('/categories');
};

//Mostrar formulario de editar
exports.showEditForm = async (req, res) => {
    const category = await Caterogy.getById(req.params.id);
    res.render('categories/edit', {
        category,
        pagina: 'dashboard',
        titulo: 'Editar Categoría',
        user: req.session.user
    });
};

//Editar categoria
exports.edit = async (req, res) => {
    const { name } = req.body;
    await Caterogy.update(req.params.id, name, 1);
    res.redirect('/categories');
};

//Desactivar categoria
exports.deactivate = async (req, res) => {
    await Caterogy.deactivate(req.params.id);
    res.redirect('/categories');
};

//Activar categoria
exports.activate = async (req, res) => {
    await Caterogy.activate(req.params.id);
    res.redirect('/categories/inactive');
};

//Eliminar categoria
exports.delete = async (req, res) => {
    await Caterogy.delete(req.params.id);
    res.redirect('/categories');
};