const pool = require('../database/connection');

// Obtener todos los autores (ahora solo activos por defecto, y opción para inactivos)
exports.getAll = async (search = '', state = '1', page = 1, limit = 10) => {
    let query = 'SELECT * FROM authors WHERE 1=1';
    let countQuery = 'SELECT COUNT(*) as total FROM authors WHERE 1=1';
    const params = [];
    const countParams = [];
    if (search) {
        query += ' AND name LIKE ?';
        countQuery += ' AND name LIKE ?';
        params.push(`%${search}%`);
        countParams.push(`%${search}%`);
    }
    if (state !== '') {
        query += ' AND state = ?';
        countQuery += ' AND state = ?';
        params.push(state);
        countParams.push(state);
    }
    query += ' ORDER BY id_author DESC LIMIT ? OFFSET ?';
    params.push(Number(limit), (Number(page) - 1) * Number(limit));
    const [rows] = await pool.query(query, params);
    const [countRows] = await pool.query(countQuery, countParams);
    return { authors: rows, total: countRows[0].total };
};

// Obtener un autor por ID
exports.getById = async (id) => {
    const [rows] = await pool.query('SELECT * FROM authors WHERE id_author = ?', [id]);
    return rows[0];
};

// Crear un nuevo autor (ahora acepta state)
exports.create = async (name, state) => {
    const [result] = await pool.query('INSERT INTO authors (name, state) VALUES (?, ?)', [name, state]);
    return result.insertId;
};

// Actualizar un autor (ahora acepta state)
exports.update = async (id, name, state) => {
    await pool.query('UPDATE authors SET name = ?, state = ? WHERE id_author = ?', [name, state, id]);
};

// Eliminar un autor
exports.delete = async (id) => {
    await pool.query('DELETE FROM authors WHERE id_author = ?', [id]);
};

// Desactivar autor (soft delete)
exports.deactivate = async (id) => {
    await pool.query('UPDATE authors SET state = 0 WHERE id_author = ?', [id]);
};

// Activar autor
exports.activate = async (id) => {
    await pool.query('UPDATE authors SET state = 1 WHERE id_author = ?', [id]);
};