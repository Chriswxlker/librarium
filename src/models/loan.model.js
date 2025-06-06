const db = require('../database/connection');

class Loan {
    static async create({ user_id, id_book, due_date }) {
        const [result] = await db.execute(
            'INSERT INTO loans (user_id, id_book, due_date, status) VALUES (?, ?, ?, ?)',
            [user_id, id_book, due_date, 'pending']
        );
        return result.insertId;
    }

    static async getAll() {
        const [rows] = await db.execute(`
            SELECT l.*, u.name AS user_name, b.name AS book_name
            FROM loans l
            LEFT JOIN users u ON l.user_id = u.id
            LEFT JOIN books b ON l.id_book = b.id_book
        `);
        return rows;
    }

    static async getById(id) {
        const [rows] = await db.execute('SELECT * FROM loans WHERE id = ?', [id]);
        return rows[0];
    }

    static async getByUser(user_id) {
        const [rows] = await db.execute('SELECT * FROM loans WHERE user_id = ?', [user_id]);
        return rows;
    }

    static async updateStatus(id, status) {
        await db.execute('UPDATE loans SET status = ? WHERE id = ?', [status, id]);
    }

    static async setReturned(id) {
        await db.execute('UPDATE loans SET status = ?, returned_at = NOW() WHERE id = ?', ['returned', id]);
    }
}

module.exports = Loan;
