const db = require('../database/connection');

class Loan {
    static async create({ id_user, id_book, due_date }) {
        const [result] = await db.execute(
            'INSERT INTO loans (id_user, id_book, loan_date, due_date, status) VALUES (?, ?, NOW(), ?, ?)',
            [id_user, id_book, due_date, 'activo']
        );
        return result.insertId;
    }

    static async getAll() {
        const [rows] = await db.execute(`
            SELECT l.*, u.name AS user_name, b.name AS book_name
            FROM loans l
            LEFT JOIN users u ON l.id_user = u.id
            LEFT JOIN books b ON l.id_book = b.id_book
        `);
        return rows;
    }

    static async getById(id) {
        const [rows] = await db.execute('SELECT l.*, l.id_loan AS id FROM loans l WHERE l.id_loan = ?', [id]);
        return rows[0];
    }

    static async getByUser(id_user) {
        const [rows] = await db.execute(`
            SELECT l.*, b.name AS book_name
            FROM loans l
            LEFT JOIN books b ON l.id_book = b.id_book
            WHERE l.id_user = ?
        `, [id_user]);
        return rows;
    }

    static async updateStatus(id, status) {
        await db.execute('UPDATE loans SET status = ? WHERE id = ?', [status, id]);
    }

    static async setReturned(id) {
        await db.execute('UPDATE loans SET status = ?, returned_at = NOW() WHERE id = ?', ['returned', id]);
    }

    static async update(id_loan, { id_user, id_book, due_date, status }) {
        await db.execute(
            'UPDATE loans SET id_user = ?, id_book = ?, due_date = ?, status = ? WHERE id_loan = ?',
            [id_user, id_book, due_date, status, id_loan]
        );
    }
}

module.exports = Loan;
