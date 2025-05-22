const pool = require('../database/connection');

//Obtener todas las categorías (ahora solo activas por defecto, y opción para inactivas)
exports.getAll = async (search = '', state = '1', page = 1, limit = 10) => {
    let query = 'SELECT * FROM categories WHERE 1=1';
    let countQuery = 'SELECT COUNT(*) as total FROM categories WHERE 1=1';
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
    query += ' ORDER BY id_category DESC LIMIT ? OFFSET ?';
    params.push(Number(limit), (Number(page) - 1) * Number(limit));
    const [rows] = await pool.query(query, params);
    const [countRows] = await pool.query(countQuery, countParams);
    return { categories: rows, total: countRows[0].total };
};

// Obtener una categoría por ID
exports.getById = async (id) => {
    const [rows] = await pool.query('SELECT * FROM categories WHERE id_category = ?', [id]);
    return rows[0];
};

// Crear una nueva categoría (ahora acepta state)
exports.create = async (name, state) => {
    const [result] = await pool.query('INSERT INTO categories (name, state) VALUES (?, ?)', [name, state]);
    return result.insertId;
};

// Actualizar una categoría (ahora acepta state)
exports.update = async (id, name, state) => {
    await pool.query('UPDATE categories SET name = ?, state = ? WHERE id_category = ?', [name, state, id]);
};

// Eliminar una categoría
exports.delete = async (id) => {
    await pool.query('DELETE FROM categories WHERE id_category = ?', [id]);
};

// Desactivar categoría (soft delete)
exports.deactivate = async (id) => {
    await pool.query('UPDATE categories SET state = 0 WHERE id_category = ?', [id]);
};

// Activar categoría
exports.activate = async (id) => {
    await pool.query('UPDATE categories SET state = 1 WHERE id_category = ?', [id]);
};