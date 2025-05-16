const mysql = require('mysql2/promise'); // Usamos la versión promisificada
require('dotenv').config();

// Configuración del pool de conexiones (recomendado para eficiencia)
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10, // Máximo de conexiones simultáneas
    queueLimit: 0
});

// Prueba la conexión al iniciar
pool.getConnection()
    .then(connection => {
        console.log('✅ Conectado a MySQL!');
        connection.release();
    })
.catch(err => {
    console.error('❌ Error de conexión a MySQL:', err.message);
    });

module.exports = pool;