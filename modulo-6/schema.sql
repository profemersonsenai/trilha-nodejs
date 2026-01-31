CREATE DATABASE IF NOT EXISTS seguranca_demo;
USE seguranca_demo;

DROP TABLE IF EXISTS usuarios;

CREATE TABLE usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  email VARCHAR(120) NOT NULL UNIQUE,
  senha VARCHAR(60) NOT NULL,
  role ENUM('admin','user') NOT NULL DEFAULT 'user'
);

INSERT INTO usuarios (nome, email, senha, role) VALUES
('Admin', 'admin@demo.com', '123', 'admin'),
('User',  'user@demo.com',  '123', 'user');