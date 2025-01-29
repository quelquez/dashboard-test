-- Создание базы данных
CREATE DATABASE test_db;

-- Подключение к базе данных --
\c test_db;

-- Создание таблицы users --
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    name VARCHAR(255),
    email VARCHAR(255) UNIQUE NOT NULL,
    birth_date DATE,
    registration_date DATE DEFAULT CURRENT_DATE
);

-- Создание таблицы orders --
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    total NUMERIC(10, 2) NOT NULL,
    created_at DATE DEFAULT CURRENT_DATE,
    status VARCHAR(20) DEFAULT 'pending',
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Добавление данных в таблицу users--
INSERT INTO users (username, name, email, birth_date) VALUES
('kar1n','Карина Милорадова', 'karina7218@mail.ru', '1977-01-01'),
('ra1sa67','Раиса Чурсунова', 'raisa.chursunova@yandex.ru', '1967-07-15'),
('swanjke','Герман Лебединский', 'german10021977@rambler.ru', '1985-05-30');

-- Добавление данных в таблицу orders--
INSERT INTO orders (user_id, total, created_at) VALUES
(1, 100.50, '2023-01-10'),
(2, 250.00, '2023-02-20'),
(1, 75.00, '2023-03-05'),
(3, 500.99, '2023-03-15');