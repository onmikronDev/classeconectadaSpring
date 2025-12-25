-- Criar banco de dados
CREATE DATABASE IF NOT EXISTS classe_conectada CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE classe_conectada;

-- Tabela de usuários (base)
CREATE TABLE IF NOT EXISTS users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    tipo ENUM('ALUNO', 'PROFESSOR', 'DIRETOR') NOT NULL,
    ativo TINYINT(1) DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabela de turmas
CREATE TABLE IF NOT EXISTS school_classes (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    descricao TEXT,
    ativo TINYINT(1) DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabela de alunos
CREATE TABLE IF NOT EXISTS students (
    id BIGINT PRIMARY KEY,
    matricula VARCHAR(50),
    school_class_id BIGINT,
    FOREIGN KEY (id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (school_class_id) REFERENCES school_classes(id) ON DELETE SET NULL
);

-- Tabela de professores
CREATE TABLE IF NOT EXISTS teachers (
    id BIGINT PRIMARY KEY,
    especialidade VARCHAR(255),
    FOREIGN KEY (id) REFERENCES users(id) ON DELETE CASCADE
);

-- Tabela de diretores
CREATE TABLE IF NOT EXISTS directors (
    id BIGINT PRIMARY KEY,
    FOREIGN KEY (id) REFERENCES users(id) ON DELETE CASCADE
);

-- Tabela de matérias
CREATE TABLE IF NOT EXISTS subjects (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    descricao TEXT,
    teacher_id BIGINT,
    school_class_id BIGINT,
    ativo TINYINT(1) DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (teacher_id) REFERENCES teachers(id) ON DELETE SET NULL,
    FOREIGN KEY (school_class_id) REFERENCES school_classes(id) ON DELETE SET NULL
);

-- Tabela de notas
CREATE TABLE IF NOT EXISTS grades (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    student_id BIGINT NOT NULL,
    subject_id BIGINT NOT NULL,
    value DECIMAL(4,2) NOT NULL CHECK (value >= 0 AND value <= 10),
    description VARCHAR(500),
    exam_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
    FOREIGN KEY (subject_id) REFERENCES subjects(id) ON DELETE CASCADE
);

-- Tabela de observações
CREATE TABLE IF NOT EXISTS observations (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    student_id BIGINT NOT NULL,
    content TEXT NOT NULL,
    date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE
);

-- Inserir dados de exemplo

-- Turmas
INSERT INTO school_classes (nome, descricao) VALUES
('Turma A', 'Turma do período matutino'),
('Turma B', 'Turma do período vespertino'),
('Turma C', 'Turma do período noturno');

-- Diretor
INSERT INTO users (nome, email, senha, tipo) VALUES
('Administrador', 'admin@email.com', '123456', 'DIRETOR');

INSERT INTO directors (id) VALUES (LAST_INSERT_ID());

-- Professores
INSERT INTO users (nome, email, senha, tipo) VALUES
('João Silva', 'joao@email.com', '123456', 'PROFESSOR'),
('Ana Santos', 'ana@email.com', '123456', 'PROFESSOR'),
('Carlos Pereira', 'carlos@email.com', '123456', 'PROFESSOR');

INSERT INTO teachers (id, especialidade) VALUES
((SELECT id FROM users WHERE email = 'joao@email.com'), 'Matemática'),
((SELECT id FROM users WHERE email = 'ana@email.com'), 'Português'),
((SELECT id FROM users WHERE email = 'carlos@email.com'), 'Ciências');

-- Matérias
INSERT INTO subjects (nome, descricao, teacher_id, school_class_id) VALUES
('Matemática', 'Álgebra e Geometria', (SELECT id FROM users WHERE email = 'joao@email.com'), 1),
('Português', 'Gramática e Literatura', (SELECT id FROM users WHERE email = 'ana@email.com'), 1),
('Ciências', 'Biologia e Física', (SELECT id FROM users WHERE email = 'carlos@email.com'), 1),
('Geografia', 'Geografia Geral', (SELECT id FROM users WHERE email = 'joao@email.com'), 2),
('História', 'História do Brasil', (SELECT id FROM users WHERE email = 'ana@email.com'), 2);

-- Alunos
INSERT INTO users (nome, email, senha, tipo) VALUES
('Alice Oliveira', 'alice@email.com', '123456', 'ALUNO'),
('João Aluno', 'joao.aluno@email.com', '123456', 'ALUNO'),
('Maria Costa', 'maria@email.com', '123456', 'ALUNO'),
('Pedro Souza', 'pedro@email.com', '123456', 'ALUNO'),
('Julia Fernandes', 'julia@email.com', '123456', 'ALUNO'),
('Lucas Martins', 'lucas@email.com', '123456', 'ALUNO'),
('Beatriz Lima', 'beatriz@email.com', '123456', 'ALUNO'),
('Rafael Santos', 'rafael@email.com', '123456', 'ALUNO');

INSERT INTO students (id, matricula, school_class_id) VALUES
((SELECT id FROM users WHERE email = 'alice@email.com'), 'MAT001', 1),
((SELECT id FROM users WHERE email = 'joao.aluno@email.com'), 'MAT002', 1),
((SELECT id FROM users WHERE email = 'maria@email.com'), 'MAT003', 1),
((SELECT id FROM users WHERE email = 'pedro@email.com'), 'MAT004', 1),
((SELECT id FROM users WHERE email = 'julia@email.com'), 'MAT005', 2),
((SELECT id FROM users WHERE email = 'lucas@email.com'), 'MAT006', 2),
((SELECT id FROM users WHERE email = 'beatriz@email.com'), 'MAT007', 3),
((SELECT id FROM users WHERE email = 'rafael@email.com'), 'MAT008', 3);

-- Notas de exemplo
INSERT INTO grades (student_id, subject_id, value, description, exam_date) VALUES
((SELECT id FROM users WHERE email = 'alice@email.com'), 1, 8.5, 'Prova Bimestral', '2024-12-01'),
((SELECT id FROM users WHERE email = 'alice@email.com'), 2, 9.0, 'Trabalho em Grupo', '2024-12-05'),
((SELECT id FROM users WHERE email = 'joao.aluno@email.com'), 1, 7.5, 'Prova Bimestral', '2024-12-01'),
((SELECT id FROM users WHERE email = 'joao.aluno@email.com'), 2, 8.0, 'Trabalho em Grupo', '2024-12-05'),
((SELECT id FROM users WHERE email = 'maria@email.com'), 1, 9.5, 'Prova Bimestral', '2024-12-01'),
((SELECT id FROM users WHERE email = 'maria@email.com'), 2, 9.2, 'Trabalho em Grupo', '2024-12-05');

-- Observações de exemplo
INSERT INTO observations (student_id, content, date) VALUES
((SELECT id FROM users WHERE email = 'alice@email.com'), 'Aluna participativa e dedicada', '2024-12-10'),
((SELECT id FROM users WHERE email = 'joao.aluno@email.com'), 'Precisa melhorar a concentração em sala', '2024-12-11'),
((SELECT id FROM users WHERE email = 'maria@email.com'), 'Excelente desempenho nas atividades', '2024-12-12');
