const db = require('../database/connection');

const Book = {
  // Crear un nuevo libro
    create: async (data) => {
        const { name, id_author, isbn, year_published, num_pages, id_category, id_publisher } = data;
        const [result] = await db.query(
        `INSERT INTO books (name, id_author, isbn, year_published, num_pages, id_category, id_publisher) VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [name, id_author, isbn, year_published, num_pages, id_category, id_publisher]
        );
        return result.insertId;
    },

    // Obtener todos los libros activos con joins
    getAll: async (limit = 10, offset = 0) => {
        const [rows] = await db.query(
        `SELECT b.*, a.name AS author, c.name AS category, p.name AS publisher
        FROM books b
        LEFT JOIN authors a ON b.id_author = a.id_author
        LEFT JOIN categories c ON b.id_category = c.id_category
        LEFT JOIN publishers p ON b.id_publisher = p.id_publisher
        WHERE b.state = 1
        ORDER BY b.created_at DESC
        LIMIT ? OFFSET ?`,
        [limit, offset]
        );
        return rows;
    },

    // Contar libros activos
    countAll: async () => {
        const [rows] = await db.query('SELECT COUNT(*) AS count FROM books WHERE state = 1');
        return rows[0].count;
    },

    // Obtener libros inactivos
    getInactive: async (limit = 10, offset = 0) => {
        const [rows] = await db.query(
        `SELECT b.*, a.name AS author, c.name AS category, p.name AS publisher
        FROM books b
        LEFT JOIN authors a ON b.id_author = a.id_author
        LEFT JOIN categories c ON b.id_category = c.id_category
        LEFT JOIN publishers p ON b.id_publisher = p.id_publisher
        WHERE b.state = 0
        ORDER BY b.updated_at DESC
        LIMIT ? OFFSET ?`,
        [limit, offset]
        );
        return rows;
    },

    // Contar libros inactivos
    countInactive: async () => {
        const [rows] = await db.query('SELECT COUNT(*) AS count FROM books WHERE state = 0');
        return rows[0].count;
    },

    // Buscar libros por nombre, autor, ISBN, etc.
    search: async (query, limit = 10, offset = 0) => {
        const like = `%${query}%`;
        const [rows] = await db.query(
        `SELECT b.*, a.name AS author, c.name AS category, p.name AS publisher
        FROM books b
        LEFT JOIN authors a ON b.id_author = a.id_author
        LEFT JOIN categories c ON b.id_category = c.id_category
        LEFT JOIN publishers p ON b.id_publisher = p.id_publisher
        WHERE b.state = 1 AND (
            b.name LIKE ? OR
            a.name LIKE ? OR
            b.isbn LIKE ?
        )
        ORDER BY b.created_at DESC
        LIMIT ? OFFSET ?`,
        [like, like, like, limit, offset]
        );
        return rows;
    },

    // Contar resultados de búsqueda
    countSearch: async (query) => {
        const like = `%${query}%`;
        const [rows] = await db.query(
        `SELECT COUNT(*) AS count
        FROM books b
        LEFT JOIN authors a ON b.id_author = a.id_author
        WHERE b.state = 1 AND (b.name LIKE ? OR a.name LIKE ? OR b.isbn LIKE ?)` ,
        [like, like, like]
        );
        return rows[0].count;
    },

    // Obtener libro por ID
    getById: async (id_book) => {
        const [rows] = await db.query(
        `SELECT b.*, a.name AS author, c.name AS category, p.name AS publisher
        FROM books b
        LEFT JOIN authors a ON b.id_author = a.id_author
        LEFT JOIN categories c ON b.id_category = c.id_category
        LEFT JOIN publishers p ON b.id_publisher = p.id_publisher
        WHERE b.id_book = ?`,
        [id_book]
        );
        return rows[0];
    },

    // Actualizar libro
    update: async (id_book, data) => {
        const { name, id_author, isbn, year_published, num_pages, id_category, id_publisher } = data;
        await db.query(
        `UPDATE books SET name = ?, id_author = ?, isbn = ?, year_published = ?, num_pages = ?, id_category = ?, id_publisher = ?, updated_at = CURRENT_TIMESTAMP WHERE id_book = ?`,
        [name, id_author, isbn, year_published, num_pages, id_category, id_publisher, id_book]
        );
    },

    // Cambiar estado (activar/desactivar)
    setState: async (id_book, state) => {
        await db.query('UPDATE books SET state = ?, updated_at = CURRENT_TIMESTAMP WHERE id_book = ?', [state, id_book]);
    },

    // Obtener todos los libros disponibles (no prestados actualmente)
    getAllAvailable: async () => {
        const [rows] = await db.query(`
            SELECT b.* FROM books b
            WHERE b.state = 1 AND b.id_book NOT IN (
                SELECT id_book FROM loans WHERE status IN ('pending', 'approved')
            )
        `);
        return rows;
    },
};

module.exports = Book;
