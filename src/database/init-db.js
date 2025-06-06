// Script para inicializar la base de datos desde db/librarium_db.sql
// Requiere: npm install mysql2
const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');

// Configura aquí tus credenciales de MySQL
const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_USER = process.env.DB_USER || 'root';
const DB_PASSWORD = process.env.DB_PASSWORD || '';
const DB_NAME = process.env.DB_NAME || 'librarium_db';

async function main() {
    try {
        const sqlPath = path.resolve(__dirname, '../../db/librarium_db.sql');
        const sql = fs.readFileSync(sqlPath, 'utf8');
        // Conexión sin base de datos para crearla si no existe
        const connection = await mysql.createConnection({
            host: DB_HOST,
            user: DB_USER,
            password: DB_PASSWORD
        });
        // Crear la base de datos si no existe
        await connection.query(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\`;`);
        await connection.changeUser({ database: DB_NAME });
        // Ejecutar el script SQL
        await connection.query(sql);
        await connection.end();
        console.log('Base de datos inicializada correctamente.');
    } catch (err) {
        console.error('Error al inicializar la base de datos:', err);
        process.exit(1);
    }
}

main();
