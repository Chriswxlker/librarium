const Loan = require('../models/loan.model');
const Book = require('../models/book.model');
const User = require('../models/user.model');

// Solicitar préstamo (usuario)
exports.requestLoan = async (req, res) => {
    try {
        const { id_book, due_date } = req.body;
        const user_id = req.session.user.id;
        // Verificar disponibilidad del libro
        const availableBooks = await Book.getAllAvailable();
        if (!availableBooks.find(b => b.id_book == id_book)) {
            return res.status(400).render('loans/add', { error: 'El libro no está disponible.', user: req.session.user, titulo: 'Solicitar préstamo' });
        }
        await Loan.create({ user_id, id_book, due_date });
        res.redirect('/loans/my');
    } catch (err) {
        console.error('Error en requestLoan:', err);
        res.status(500).render('loans/add', { error: 'Error al solicitar préstamo.', user: req.session.user, titulo: 'Solicitar préstamo' });
    }
};

// Listar préstamos del usuario
exports.myLoans = async (req, res) => {
    try {
        const user_id = req.session.user.id;
        const loans = await Loan.getByUser(user_id);
        res.render('loans/my', { loans, user: req.session.user, titulo: 'Mis préstamos' });
    } catch (err) {
        console.error('Error en myLoans:', err);
        res.status(500).render('loans/my', { error: 'Error al cargar préstamos.', user: req.session.user, titulo: 'Mis préstamos' });
    }
};

// Listar todos los préstamos (bibliotecario)
exports.list = async (req, res) => {
    try {
        const loans = await Loan.getAll();
        res.render('loans/list', { loans, user: req.session.user, titulo: 'Gestión de préstamos', error: null });
    } catch (err) {
        console.error('Error en list:', err);
        res.status(500).render('loans/list', { loans: [], user: req.session.user, titulo: 'Gestión de préstamos', error: 'Error al cargar préstamos.' });
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

// Marcar préstamo como devuelto (bibliotecario)
exports.returnLoan = async (req, res) => {
    try {
        const { id } = req.params;
        await Loan.setReturned(id);
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
        res.render('loans/add', { books, user: req.session.user, titulo: 'Solicitar préstamo' });
    } catch (err) {
        console.error('Error en addForm:', err);
        res.status(500).render('loans/add', { error: 'Error al cargar libros.', user: req.session.user, titulo: 'Solicitar préstamo' });
    }
};

// Formulario para asignar préstamo (bibliotecario o admin)
exports.assignForm = async (req, res) => {
    try {
        const users = await User.getAllNoPaginate(1); // usuarios activos sin paginación
        const books = await Book.getAllAvailable();
        res.render('loans/assign', { users, books, user: req.session.user, titulo: 'Asignar préstamo', error: null });
    } catch (err) {
        console.error('Error en assignForm:', err);
        res.status(500).render('loans/assign', { users: [], books: [], user: req.session.user, titulo: 'Asignar préstamo', error: 'Error al cargar datos.' });
    }
};

// Asignar préstamo (bibliotecario o admin)
exports.assign = async (req, res) => {
    try {
        const { user_id, id_book, due_date } = req.body;
        // Verificar disponibilidad del libro
        const availableBooks = await Book.getAllAvailable();
        if (!availableBooks.find(b => b.id_book == id_book)) {
            const users = await User.getAllNoPaginate(1);
            return res.status(400).render('loans/assign', { users, books: availableBooks, user: req.session.user, titulo: 'Asignar préstamo', error: 'El libro no está disponible.' });
        }
        await Loan.create({ user_id, id_book, due_date });
        res.redirect('/loans');
    } catch (err) {
        console.error('Error en assign:', err);
        const users = await User.getAllNoPaginate(1);
        const books = await Book.getAllAvailable();
        res.status(500).render('loans/assign', { users, books, user: req.session.user, titulo: 'Asignar préstamo', error: 'Error al asignar préstamo.' });
    }
};
