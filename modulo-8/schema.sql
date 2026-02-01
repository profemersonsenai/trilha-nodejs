CREATE DATABASE IF NOT EXISTS seguranca_demo;
USE seguranca_demo;

DROP TABLE IF EXISTS usuarios;

CREATE TABLE usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome  VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  senha VARCHAR(255) NOT NULL
);

INSERT INTO usuarios (nome, email, senha) VALUES
('Admin', 'admin@demo.com', '123456'),
('User',  'user@demo.com',  '123456');
