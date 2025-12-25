<?php
require_once 'config.php';

$conn = getConnection();
$method = $_SERVER['REQUEST_METHOD'];

// Pegar parâmetros da URL
$uri = $_SERVER['REQUEST_URI'];
$uriParts = explode('/', trim($uri, '/'));

// Checar se há filtro por turma
$turmaFilter = isset($_GET['turma']) ? $_GET['turma'] : null;
if (!$turmaFilter && strpos($uri, '/turma/') !== false) {
    $turmaFilter = end($uriParts);
}

$id = isset($uriParts[count($uriParts) - 1]) && is_numeric($uriParts[count($uriParts) - 1]) && !$turmaFilter
    ? $uriParts[count($uriParts) - 1] 
    : null;

try {
    switch($method) {
        case 'GET':
            if ($turmaFilter) {
                // Buscar alunos de uma turma específica
                $stmt = $conn->prepare("
                    SELECT s.*, u.nome, u.email, u.tipo, u.ativo 
                    FROM students s
                    JOIN users u ON s.id = u.id
                    WHERE s.school_class_id = ? AND u.ativo = 1
                    ORDER BY u.nome
                ");
                $stmt->execute([$turmaFilter]);
                $students = $stmt->fetchAll();
                sendResponse($students);
            } else if ($id) {
                // Buscar um aluno específico
                $stmt = $conn->prepare("
                    SELECT s.*, u.nome, u.email, u.tipo, u.ativo 
                    FROM students s
                    JOIN users u ON s.id = u.id
                    WHERE s.id = ? AND u.ativo = 1
                ");
                $stmt->execute([$id]);
                $student = $stmt->fetch();
                
                if ($student) {
                    sendResponse($student);
                } else {
                    sendResponse(['success' => false, 'message' => 'Aluno não encontrado'], 404);
                }
            } else {
                // Listar todos os alunos ativos
                $stmt = $conn->query("
                    SELECT s.*, u.nome, u.email, u.tipo, u.ativo 
                    FROM students s
                    JOIN users u ON s.id = u.id
                    WHERE u.ativo = 1
                    ORDER BY u.nome
                ");
                $students = $stmt->fetchAll();
                sendResponse($students);
            }
            break;
            
        case 'POST':
            // Criar novo aluno
            $data = json_decode(file_get_contents('php://input'), true);
            
            if (!isset($data['nome']) || !isset($data['email'])) {
                sendResponse(['success' => false, 'message' => 'Nome e email são obrigatórios'], 400);
            }
            
            $conn->beginTransaction();
            
            // Inserir usuário
            $stmt = $conn->prepare("
                INSERT INTO users (nome, email, senha, tipo, ativo) 
                VALUES (?, ?, ?, 'ALUNO', 1)
            ");
            $stmt->execute([
                $data['nome'], 
                $data['email'], 
                $data['senha'] ?? '123456'
            ]);
            
            $userId = $conn->lastInsertId();
            
            // Inserir aluno
            $stmt = $conn->prepare("
                INSERT INTO students (id, matricula, school_class_id) 
                VALUES (?, ?, ?)
            ");
            $stmt->execute([
                $userId,
                $data['matricula'] ?? null,
                $data['school_class_id'] ?? null
            ]);
            
            $conn->commit();
            
            sendResponse(['success' => true, 'id' => $userId, 'message' => 'Aluno criado com sucesso'], 201);
            break;
            
        case 'PUT':
            // Atualizar aluno
            if (!$id) {
                sendResponse(['success' => false, 'message' => 'ID é obrigatório'], 400);
            }
            
            $data = json_decode(file_get_contents('php://input'), true);
            
            $conn->beginTransaction();
            
            // Atualizar usuário
            $stmt = $conn->prepare("UPDATE users SET nome = ?, email = ? WHERE id = ?");
            $stmt->execute([$data['nome'], $data['email'], $id]);
            
            // Atualizar aluno
            $stmt = $conn->prepare("UPDATE students SET matricula = ?, school_class_id = ? WHERE id = ?");
            $stmt->execute([$data['matricula'] ?? null, $data['school_class_id'] ?? null, $id]);
            
            $conn->commit();
            
            sendResponse(['success' => true, 'message' => 'Aluno atualizado com sucesso']);
            break;
            
        case 'DELETE':
            // Desativar aluno (soft delete)
            if (!$id) {
                sendResponse(['success' => false, 'message' => 'ID é obrigatório'], 400);
            }
            
            $stmt = $conn->prepare("UPDATE users SET ativo = 0 WHERE id = ?");
            $stmt->execute([$id]);
            
            sendResponse(['success' => true, 'message' => 'Aluno desativado com sucesso']);
            break;
            
        default:
            sendResponse(['success' => false, 'message' => 'Método não permitido'], 405);
    }
} catch(Exception $e) {
    if ($conn->inTransaction()) {
        $conn->rollBack();
    }
    sendResponse(['success' => false, 'message' => 'Erro: ' . $e->getMessage()], 500);
}
?>
