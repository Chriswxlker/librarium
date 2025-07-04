const Loan = require('../models/loan.model');
const Book = require('../models/book.model');
const User = require('../models/user.model');

// Procesa la solicitud de préstamo (usuario)
exports.requestLoan = async (req, res) => {
    try {
        const user_id = req.session.user.id;
        const { book_id, due_date } = req.body;
        if (!book_id || !due_date) {
            const books = await Book.getAllAvailable();
            return res.status(400).render('loans/add', { books, user: req.session.user, titulo: 'Solicitar préstamo', pagina: 'Solicitar Préstamo', error: 'Todos los campos son obligatorios.' });
        }
        // Verificar que el usuario no tenga ya un préstamo activo de ese libro
        const [rows] = await require('../database/connection').execute(
            'SELECT * FROM loans WHERE id_user = ? AND id_book = ? AND status IN ("activo", "aprobado")',
            [user_id, book_id]
        );
        if (rows.length > 0) {
            const books = await Book.getAllAvailable();
            return res.status(400).render('loans/add', { books, user: req.session.user, titulo: 'Solicitar préstamo', pagina: 'Solicitar Préstamo', error: 'Ya tienes este libro prestado.' });
        }
        await Loan.create({ id_user: user_id, id_book: book_id, due_date });
        res.redirect('/loans/my');
    } catch (err) {
        console.error('Error en requestLoan:', err);
        const books = await Book.getAllAvailable();
        res.status(500).render('loans/add', { books, user: req.session.user, titulo: 'Solicitar préstamo', pagina: 'Solicitar Préstamo', error: 'Error al solicitar préstamo.' });
    }
};

// Listar préstamos del usuario
exports.myLoans = async (req, res) => {
    try {
        const user_id = req.session.user.id;
        const loans = await Loan.getByUser(user_id);
        res.render('loans/my', { loans, user: req.session.user, titulo: 'Mis préstamos', pagina: 'Mis Préstamos' });
    } catch (err) {
        console.error('Error en myLoans:', err);
        res.status(500).render('loans/my', { error: 'Error al cargar préstamos.', user: req.session.user, titulo: 'Mis préstamos', pagina: 'Mis Préstamos' });
    }
};

// Listar todos los préstamos (bibliotecario)
exports.list = async (req, res) => {
    try {
        const loans = await Loan.getAll();
        res.render('loans/list', { loans, user: req.session.user, titulo: 'Gestión de préstamos', error: null, pagina: 'Prestamos' });
    } catch (err) {
        console.error('Error en list:', err);
        res.status(500).render('loans/list', { loans: [], user: req.session.user, titulo: 'Gestión de préstamos', error: 'Error al cargar préstamos.', pagina: 'Prestamos' });
    }
};

// Aprobar o rechazar préstamo (bibliotecario)
exports.updateStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body; // 'approved' o 'rejected'
        await Loan.updateStatus(id, status);
        res.redirect('/loans');
    } catch (err) {
        console.error('Error en updateStatus:', err);
        res.status(500).send('Error al actualizar el estado del préstamo.');
    }
};

// Asignar préstamo (bibliotecario o admin)
exports.assign = async (req, res) => {
    try {
        const { user_id, book_id, due_date } = req.body;
        // Validación de stock
        const book = await Book.getById(book_id);
        if (!book || book.stock < 1) {
            const users = await User.getAllNoPaginate(1);
            const books = await Book.getAllAvailable();
            return res.status(400).render('loans/assign', { users, books, user: req.session.user, titulo: 'Asignar préstamo', error: 'No hay stock disponible para este libro.' });
        }
        // Validación de campos obligatorios
        if (!user_id || !book_id || !due_date) {
            const users = await User.getAllNoPaginate(1);
            const books = await Book.getAllAvailable();
            return res.status(400).render('loans/assign', { users, books, user: req.session.user, titulo: 'Asignar préstamo', error: 'Todos los campos son obligatorios.' });
        }
        // Verificar que el usuario no tenga ya un préstamo activo de ese libro
        const [rows] = await require('../database/connection').execute(
            'SELECT * FROM loans WHERE id_user = ? AND id_book = ? AND status IN ("activo", "aprobado")',
            [user_id, book_id]
        );
        if (rows.length > 0) {
            const users = await User.getAllNoPaginate(1);
            const books = await Book.getAllAvailable();
            return res.status(400).render('loans/assign', { users, books, user: req.session.user, titulo: 'Asignar préstamo', error: 'El usuario ya tiene este libro prestado.' });
        }
        await Loan.create({ id_user: user_id, id_book: book_id, due_date });
        await Book.decrementStock(book_id);
        res.redirect('/loans');
    } catch (err) {
        console.error('Error en assign:', err);
        const users = await User.getAllNoPaginate(1);
        const books = await Book.getAllAvailable();
        res.status(500).render('loans/assign', { users, books, user: req.session.user, titulo: 'Asignar préstamo', error: 'Error al asignar préstamo.', pagina: 'Asignar Préstamo' });
    }
};

// Marcar préstamo como devuelto (bibliotecario)
exports.returnLoan = async (req, res) => {
    try {
        const { id } = req.params;
        const loan = await Loan.getById(id);
        await Loan.setReturned(id);
        await Book.incrementStock(loan.id_book);
        res.redirect('/loans');
    } catch (err) {
        console.error('Error en returnLoan:', err);
        res.status(500).send('Error al marcar como devuelto.');
    }
};

// Formulario para solicitar préstamo (usuario)
exports.addForm = async (req, res) => {
    try {
        const books = await Book.getAllAvailable();
        res.render('loans/add', { books, user: req.session.user, titulo: 'Solicitar préstamo', pagina: 'Solicitar Préstamo', error: null });
    } catch (err) {
        console.error('Error en addForm:', err);
        res.status(500).render('loans/add', { books: [], user: req.session.user, titulo: 'Solicitar préstamo', pagina: 'Solicitar Préstamo', error: 'Error al cargar libros.' });
    }
};

// Formulario para asignar préstamo (bibliotecario o admin)
exports.assignForm = async (req, res) => {
    try {
        const users = await User.getAllNoPaginate(1); // usuarios activos sin paginación
        const books = await Book.getAllAvailable();
        res.render('loans/assign', { users, books, user: req.session.user, titulo: 'Asignar préstamo', error: null, pagina: 'Asignar Préstamo' });
    } catch (err) {
        console.error('Error en assignForm:', err);
        res.status(500).render('loans/assign', { users: [], books: [], user: req.session.user, titulo: 'Asignar préstamo', error: 'Error al cargar datos.', pagina: 'Asignar Préstamo' });
    }
};

// Mostrar formulario de edición de préstamo
exports.editForm = async (req, res) => {
    try {
        const loan = await Loan.getById(req.params.id);
        const users = await User.getAllNoPaginate(1);
        const books = await Book.getAll();
        res.render('loans/edit', { loan, users, books, user: req.session.user, titulo: 'Editar Préstamo', error: null, pagina: 'Prestamos' });
    } catch (err) {
        console.error('Error en editForm:', err);
        res.status(500).render('loans/edit', { loan: {}, users: [], books: [], user: req.session.user, titulo: 'Editar Préstamo', error: 'Error al cargar el préstamo.', pagina: 'Prestamos' });
    }
};

// Procesar edición de préstamo
exports.edit = async (req, res) => {
    try {
        const { user_id, book_id, due_date, status } = req.body;
        const id_book = book_id;
        console.log('Datos recibidos para actualizar:', { user_id, id_book, due_date, status });
        await Loan.update(req.params.id, { id_user: user_id, id_book, due_date, status });
        res.redirect('/loans');
    } catch (err) {
        console.error('Error en editar préstamo:', err);
        const loan = await Loan.getById(req.params.id);
        const users = await User.getAllNoPaginate(1);
        const books = await Book.getAll();
        res.status(500).render('loans/edit', { loan, users, books, user: req.session.user, titulo: 'Editar Préstamo', error: 'Error al actualizar el préstamo.', pagina: 'Prestamos' });
    }
};
