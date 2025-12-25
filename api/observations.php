<?php
require_once 'config.php';

$conn = getConnection();
$method = $_SERVER['REQUEST_METHOD'];

$uri = $_SERVER['REQUEST_URI'];
$uriParts = explode('/', trim($uri, '/'));

$id = isset($uriParts[count($uriParts) - 1]) && is_numeric($uriParts[count($uriParts) - 1])
    ? $uriParts[count($uriParts) - 1] 
    : null;

// Checar filtros
$studentFilter = isset($_GET['student']) ? $_GET['student'] : null;
if (!$studentFilter && strpos($uri, '/student/') !== false) {
    $index = array_search('student', $uriParts);
    if ($index !== false && isset($uriParts[$index + 1])) {
        $studentFilter = $uriParts[$index + 1];
    }
}

$turmaFilter = isset($_GET['turma']) ? $_GET['turma'] : null;
if (!$turmaFilter && strpos($uri, '/turma/') !== false) {
    $index = array_search('turma', $uriParts);
    if ($index !== false && isset($uriParts[$index + 1])) {
        $turmaFilter = $uriParts[$index + 1];
    }
}

try {
    switch($method) {
        case 'GET':
            if ($studentFilter) {
                // Buscar observações de um aluno
                $stmt = $conn->prepare("
                    SELECT o.*, u.nome as student_name 
                    FROM observations o
                    JOIN users u ON o.student_id = u.id
                    WHERE o.student_id = ?
                    ORDER BY o.date DESC
                ");
                $stmt->execute([$studentFilter]);
                $observations = $stmt->fetchAll();
                sendResponse($observations);
            } else if ($turmaFilter) {
                // Buscar observações de uma turma
                $stmt = $conn->prepare("
                    SELECT o.*, u.nome as student_name 
                    FROM observations o
                    JOIN users u ON o.student_id = u.id
                    JOIN students s ON u.id = s.id
                    WHERE s.school_class_id = ?
                    ORDER BY o.date DESC
                ");
                $stmt->execute([$turmaFilter]);
                $observations = $stmt->fetchAll();
                sendResponse($observations);
            } else if ($id) {
                // Buscar uma observação específica
                $stmt = $conn->prepare("SELECT * FROM observations WHERE id = ?");
                $stmt->execute([$id]);
                $observation = $stmt->fetch();
                
                if ($observation) {
                    sendResponse($observation);
                } else {
                    sendResponse(['success' => false, 'message' => 'Observação não encontrada'], 404);
                }
            } else {
                // Listar todas as observações
                $stmt = $conn->query("
                    SELECT o.*, u.nome as student_name 
                    FROM observations o
                    JOIN users u ON o.student_id = u.id
                    ORDER BY o.date DESC
                ");
                $observations = $stmt->fetchAll();
                sendResponse($observations);
            }
            break;
            
        case 'POST':
            // Criar nova observação
            $data = json_decode(file_get_contents('php://input'), true);
            
            if (!isset($data['student_id']) || !isset($data['content'])) {
                sendResponse(['success' => false, 'message' => 'Aluno e conteúdo são obrigatórios'], 400);
            }
            
            $stmt = $conn->prepare("
                INSERT INTO observations (student_id, content, date) 
                VALUES (?, ?, ?)
            ");
            $stmt->execute([
                $data['student_id'],
                $data['content'],
                $data['date'] ?? date('Y-m-d')
            ]);
            
            $newId = $conn->lastInsertId();
            sendResponse(['success' => true, 'id' => $newId, 'message' => 'Observação criada com sucesso'], 201);
            break;
            
        case 'PUT':
            // Atualizar observação
            if (!$id) {
                sendResponse(['success' => false, 'message' => 'ID é obrigatório'], 400);
            }
            
            $data = json_decode(file_get_contents('php://input'), true);
            
            $stmt = $conn->prepare("UPDATE observations SET content = ?, date = ? WHERE id = ?");
            $stmt->execute([
                $data['content'],
                $data['date'] ?? date('Y-m-d'),
                $id
            ]);
            
            sendResponse(['success' => true, 'message' => 'Observação atualizada com sucesso']);
            break;
            
        case 'DELETE':
            // Deletar observação
            if (!$id) {
                sendResponse(['success' => false, 'message' => 'ID é obrigatório'], 400);
            }
            
            $stmt = $conn->prepare("DELETE FROM observations WHERE id = ?");
            $stmt->execute([$id]);
            
            sendResponse(['success' => true, 'message' => 'Observação deletada com sucesso']);
            break;
            
        default:
            sendResponse(['success' => false, 'message' => 'Método não permitido'], 405);
    }
} catch(Exception $e) {
    sendResponse(['success' => false, 'message' => 'Erro: ' . $e->getMessage()], 500);
}
?>
