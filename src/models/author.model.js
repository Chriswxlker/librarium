const pool = require('../database/connection');

// Obtener todos los autores
exports.getAll = async () => {
    const [rows] = await pool.query('SELECT * FROM authors');
    return rows;
};

// Obtener un autor por ID
exports.getById = async (id) => {
    const [rows] = await pool.query('SELECT * FROM authors WHERE id_author = ?', [id]);
    return rows[0];
};

// Crear un nuevo autor
exports.create = async (name) => {
    const [result] = await pool.query('INSERT INTO authors (name) VALUES (?)', [name]);
    return result.insertId;
};

// Actualizar un autor
exports.update = async (id, name) => {
    await pool.query('UPDATE authors SET name = ? WHERE id_author = ?', [name, id]);
};

// Eliminar un autor
exports.delete = async (id) => {
    await pool.query('DELETE FROM authors WHERE id_author = ?', [id]);
};