<?php
require_once 'config.php';

$conn = getConnection();
$method = $_SERVER['REQUEST_METHOD'];

// Pegar o ID da URL se existir
$uri = $_SERVER['REQUEST_URI'];
$uriParts = explode('/', trim($uri, '/'));
$id = isset($uriParts[count($uriParts) - 1]) && is_numeric($uriParts[count($uriParts) - 1]) 
    ? $uriParts[count($uriParts) - 1] 
    : null;

try {
    switch($method) {
        case 'GET':
            if ($id) {
                // Buscar uma turma específica
                $stmt = $conn->prepare("SELECT * FROM school_classes WHERE id = ? AND ativo = 1");
                $stmt->execute([$id]);
                $class = $stmt->fetch();
                
                if ($class) {
                    sendResponse($class);
                } else {
                    sendResponse(['success' => false, 'message' => 'Turma não encontrada'], 404);
                }
            } else {
                // Listar todas as turmas ativas
                $stmt = $conn->query("SELECT * FROM school_classes WHERE ativo = 1 ORDER BY nome");
                $classes = $stmt->fetchAll();
                sendResponse($classes);
            }
            break;
            
        case 'POST':
            // Criar nova turma
            $data = json_decode(file_get_contents('php://input'), true);
            
            if (!isset($data['nome'])) {
                sendResponse(['success' => false, 'message' => 'Nome é obrigatório'], 400);
            }
            
            $stmt = $conn->prepare("INSERT INTO school_classes (nome, descricao, ativo) VALUES (?, ?, 1)");
            $stmt->execute([$data['nome'], $data['descricao'] ?? null]);
            
            $newId = $conn->lastInsertId();
            sendResponse(['success' => true, 'id' => $newId, 'message' => 'Turma criada com sucesso'], 201);
            break;
            
        case 'PUT':
            // Atualizar turma
            if (!$id) {
                sendResponse(['success' => false, 'message' => 'ID é obrigatório'], 400);
            }
            
            $data = json_decode(file_get_contents('php://input'), true);
            
            $stmt = $conn->prepare("UPDATE school_classes SET nome = ?, descricao = ? WHERE id = ?");
            $stmt->execute([$data['nome'], $data['descricao'] ?? null, $id]);
            
            sendResponse(['success' => true, 'message' => 'Turma atualizada com sucesso']);
            break;
            
        case 'DELETE':
            // Desativar turma (soft delete)
            if (!$id) {
                sendResponse(['success' => false, 'message' => 'ID é obrigatório'], 400);
            }
            
            $stmt = $conn->prepare("UPDATE school_classes SET ativo = 0 WHERE id = ?");
            $stmt->execute([$id]);
            
            sendResponse(['success' => true, 'message' => 'Turma desativada com sucesso']);
            break;
            
        default:
            sendResponse(['success' => false, 'message' => 'Método não permitido'], 405);
    }
} catch(Exception $e) {
    sendResponse(['success' => false, 'message' => 'Erro: ' . $e->getMessage()], 500);
}
?>
