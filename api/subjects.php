<?php
require_once 'config.php';

$conn = getConnection();
$method = $_SERVER['REQUEST_METHOD'];

$uri = $_SERVER['REQUEST_URI'];
$uriParts = explode('/', trim($uri, '/'));

$id = isset($uriParts[count($uriParts) - 1]) && is_numeric($uriParts[count($uriParts) - 1])
    ? $uriParts[count($uriParts) - 1] 
    : null;

// Checar se há filtro por professor
$teacherFilter = isset($_GET['teacher']) ? $_GET['teacher'] : null;
if (!$teacherFilter && strpos($uri, '/teacher/') !== false) {
    $teacherFilter = end($uriParts);
}

try {
    switch($method) {
        case 'GET':
            if ($teacherFilter) {
                // Buscar matérias de um professor
                $stmt = $conn->prepare("
                    SELECT s.* 
                    FROM subjects s
                    WHERE s.teacher_id = ? AND s.ativo = 1
                    ORDER BY s.nome
                ");
                $stmt->execute([$teacherFilter]);
                $subjects = $stmt->fetchAll();
                sendResponse($subjects);
            } else if ($id) {
                // Buscar uma matéria específica
                $stmt = $conn->prepare("SELECT * FROM subjects WHERE id = ? AND ativo = 1");
                $stmt->execute([$id]);
                $subject = $stmt->fetch();
                
                if ($subject) {
                    sendResponse($subject);
                } else {
                    sendResponse(['success' => false, 'message' => 'Matéria não encontrada'], 404);
                }
            } else {
                // Listar todas as matérias ativas
                $stmt = $conn->query("SELECT * FROM subjects WHERE ativo = 1 ORDER BY nome");
                $subjects = $stmt->fetchAll();
                sendResponse($subjects);
            }
            break;
            
        case 'POST':
            // Criar nova matéria
            $data = json_decode(file_get_contents('php://input'), true);
            
            if (!isset($data['nome'])) {
                sendResponse(['success' => false, 'message' => 'Nome é obrigatório'], 400);
            }
            
            $stmt = $conn->prepare("
                INSERT INTO subjects (nome, descricao, teacher_id, school_class_id, ativo) 
                VALUES (?, ?, ?, ?, 1)
            ");
            $stmt->execute([
                $data['nome'],
                $data['descricao'] ?? null,
                $data['teacher_id'] ?? null,
                $data['school_class_id'] ?? null
            ]);
            
            $newId = $conn->lastInsertId();
            sendResponse(['success' => true, 'id' => $newId, 'message' => 'Matéria criada com sucesso'], 201);
            break;
            
        case 'PUT':
            // Atualizar matéria
            if (!$id) {
                sendResponse(['success' => false, 'message' => 'ID é obrigatório'], 400);
            }
            
            $data = json_decode(file_get_contents('php://input'), true);
            
            $stmt = $conn->prepare("
                UPDATE subjects 
                SET nome = ?, descricao = ?, teacher_id = ?, school_class_id = ? 
                WHERE id = ?
            ");
            $stmt->execute([
                $data['nome'],
                $data['descricao'] ?? null,
                $data['teacher_id'] ?? null,
                $data['school_class_id'] ?? null,
                $id
            ]);
            
            sendResponse(['success' => true, 'message' => 'Matéria atualizada com sucesso']);
            break;
            
        case 'DELETE':
            // Desativar matéria (soft delete)
            if (!$id) {
                sendResponse(['success' => false, 'message' => 'ID é obrigatório'], 400);
            }
            
            $stmt = $conn->prepare("UPDATE subjects SET ativo = 0 WHERE id = ?");
            $stmt->execute([$id]);
            
            sendResponse(['success' => true, 'message' => 'Matéria desativada com sucesso']);
            break;
            
        default:
            sendResponse(['success' => false, 'message' => 'Método não permitido'], 405);
    }
} catch(Exception $e) {
    sendResponse(['success' => false, 'message' => 'Erro: ' . $e->getMessage()], 500);
}
?>
