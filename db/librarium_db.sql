-- Crear la base de datos
CREATE DATABASE IF NOT EXISTS librarium_db;
USE librarium_db;

-- Tabla de autores
CREATE TABLE authors (
    id_author INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    state TINYINT(1) DEFAULT 1  -- 1 para activo, 0 para inactivo
);

-- Tabla de categorías
CREATE TABLE categories (
    id_category INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    state TINYINT(1) DEFAULT 1
);

-- Tabla de editoriales (publishers)
CREATE TABLE publishers (
    id_publisher INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    state TINYINT(1) DEFAULT 1
);

-- Tabla de libros (relacionada con autores, categorías y editoriales)
CREATE TABLE books (
    id_book INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    id_author INT,
    isbn VARCHAR(20) UNIQUE NOT NULL,
    year_published YEAR,
    num_pages INT,
    id_category INT,
    id_publisher INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    state TINYINT(1) DEFAULT 1,
    FOREIGN KEY (id_author) REFERENCES authors(id_author),
    FOREIGN KEY (id_category) REFERENCES categories(id_category),
    FOREIGN KEY (id_publisher) REFERENCES publishers(id_publisher)
);

-- Tabla de usuarios para sistema multiusuario
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'bibliotecario', 'usuario') NOT NULL DEFAULT 'usuario',
    status TINYINT(1) DEFAULT 1, -- 1 = activo, 0 = inactivo
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);