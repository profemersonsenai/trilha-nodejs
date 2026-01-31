CREATE DATABASE IF NOT EXISTS projeto_node;
USE projeto_node;

CREATE TABLE IF NOT EXISTS usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  email VARCHAR(120) NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT IGNORE INTO usuarios (id, nome, email) VALUES
  (1, 'João', 'joao@example.com'),
  (2, 'Maria', 'maria@example.com');
