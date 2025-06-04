// Modelo de Usuario para Librarium
// Estado: 1 = Activo, 0 = Inactivo

const db = require('../database/connection');

const User = {
    // Obtener usuarios activos/inactivos con paginación
    getAll: async (status = 1, page = 1, limit = 10) => {
        const offset = (page - 1) * limit;
        const [rows] = await db.query('SELECT * FROM users WHERE status = ? ORDER BY id DESC LIMIT ? OFFSET ?', [status, limit, offset]);
        return rows;
    },
    // Contar usuarios activos/inactivos
    countAll: async (status = 1) => {
        const [rows] = await db.query('SELECT COUNT(*) as total FROM users WHERE status = ?', [status]);
        return rows[0].total;
    },
    // Búsqueda con paginación
    search: async (search, status = 1, page = 1, limit = 10) => {
        const offset = (page - 1) * limit;
        const [rows] = await db.query('SELECT * FROM users WHERE status = ? AND (name LIKE ? OR email LIKE ?) ORDER BY id DESC LIMIT ? OFFSET ?', [status, `%${search}%`, `%${search}%`, limit, offset]);
        return rows;
    },
    // Contar resultados de búsqueda
    countSearch: async (search, status = 1) => {
        const [rows] = await db.query('SELECT COUNT(*) as total FROM users WHERE status = ? AND (name LIKE ? OR email LIKE ?)', [status, `%${search}%`, `%${search}%`]);
        return rows[0].total;
    },
    getById: async (id) => {
        const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [id]);
        return rows[0];
    },
    getByEmail: async (email) => {
        const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        return rows[0];
    },
    create: async (user) => {
        const { name, email, password, role, status } = user;
        const [result] = await db.query(
            'INSERT INTO users (name, email, password, role, status) VALUES (?, ?, ?, ?, ?)',
            [name, email, password, role, status]
        );
        return result.insertId;
    },
    update: async (id, user) => {
        const { name, email, role, status } = user;
        await db.query(
            'UPDATE users SET name = ?, email = ?, role = ?, status = ? WHERE id = ?',
            [name, email, role, status, id]
        );
    },
    updatePassword: async (id, password) => {
        await db.query('UPDATE users SET password = ? WHERE id = ?', [password, id]);
    },
    setStatus: async (id, status) => {
        await db.query('UPDATE users SET status = ? WHERE id = ?', [status, id]);
    }
};

module.exports = User;
