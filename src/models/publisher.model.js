const pool = require('../database/connection');

// Obtener todas las editoriales con paginación y búsqueda
exports.getAll = async (search = '', state = '1', page = 1, limit = 10) => {
    let query = 'SELECT * FROM publishers WHERE 1=1';
    let countQuery = 'SELECT COUNT(*) as total FROM publishers WHERE 1=1';
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

    query += ' ORDER BY id_publisher DESC LIMIT ? OFFSET ?';
    params.push(Number(limit), (Number(page) - 1) * Number(limit));

    const [rows] = await pool.query(query, params);
    const [countRows] = await pool.query(countQuery, countParams);
    return { publishers: rows, total: countRows[0].total };
};

// Obtener una editorial por ID
exports.getById = async (id) => {
    const [rows] = await pool.query('SELECT * FROM publishers WHERE id_publisher = ?', [id]);
    return rows[0];
};

// Crear una nueva editorial
exports.create = async (name, state = 1) => {
    const [result] = await pool.query('INSERT INTO publishers (name, state) VALUES (?, ?)', [name, state]);
    return result.insertId;
};

// Actualizar una editorial
exports.update = async (id, name, state) => {
    await pool.query('UPDATE publishers SET name = ?, state = ? WHERE id_publisher = ?', [name, state, id]);
};

// Activar editorial
exports.activate = async (id) => {
    await pool.query('UPDATE publishers SET state = 1 WHERE id_publisher = ?', [id]);
};

// Desactivar editorial
exports.deactivate = async (id) => {
    await pool.query('UPDATE publishers SET state = 0 WHERE id_publisher = ?', [id]);
};

// Eliminar una editorial
exports.delete = async (id) => {
    await pool.query('DELETE FROM publishers WHERE id_publisher = ?', [id]);
};
