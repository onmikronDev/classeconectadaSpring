<?php
require_once 'config.php';

$conn = getConnection();
$method = $_SERVER['REQUEST_METHOD'];

$uri = $_SERVER['REQUEST_URI'];
$uriParts = explode('/', trim($uri, '/'));

// Checar se há filtro por aluno
$studentFilter = isset($_GET['student']) ? $_GET['student'] : null;
if (!$studentFilter && strpos($uri, '/student/') !== false) {
    $index = array_search('student', $uriParts);
    if ($index !== false && isset($uriParts[$index + 1])) {
        $studentFilter = $uriParts[$index + 1];
    }
}

// Checar se há filtro por matéria
$subjectFilter = isset($_GET['subject']) ? $_GET['subject'] : null;
if (!$subjectFilter && strpos($uri, '/subject/') !== false) {
    $index = array_search('subject', $uriParts);
    if ($index !== false && isset($uriParts[$index + 1])) {
        $subjectFilter = $uriParts[$index + 1];
    }
}

$id = isset($uriParts[count($uriParts) - 1]) && is_numeric($uriParts[count($uriParts) - 1]) && !$studentFilter && !$subjectFilter
    ? $uriParts[count($uriParts) - 1] 
    : null;

try {
    switch($method) {
        case 'GET':
            if ($studentFilter && $subjectFilter) {
                // Buscar notas de um aluno em uma matéria específica
                $stmt = $conn->prepare("
                    SELECT g.*, s.nome as subject_name 
                    FROM grades g
                    JOIN subjects s ON g.subject_id = s.id
                    WHERE g.student_id = ? AND g.subject_id = ?
                    ORDER BY g.exam_date DESC
                ");
                $stmt->execute([$studentFilter, $subjectFilter]);
                $grades = $stmt->fetchAll();
                
                // Adicionar informação da matéria em cada nota
                foreach ($grades as &$grade) {
                    $grade['subject'] = ['id' => $subjectFilter, 'nome' => $grade['subject_name']];
                    unset($grade['subject_name']);
                }
                
                sendResponse($grades);
            } else if ($studentFilter) {
                // Buscar notas de um aluno
                $stmt = $conn->prepare("
                    SELECT g.*, s.nome as subject_name, s.id as subject_id
                    FROM grades g
                    JOIN subjects s ON g.subject_id = s.id
                    WHERE g.student_id = ?
                    ORDER BY g.exam_date DESC
                ");
                $stmt->execute([$studentFilter]);
                $grades = $stmt->fetchAll();
                
                // Adicionar informação da matéria em cada nota
                foreach ($grades as &$grade) {
                    $grade['subject'] = ['id' => $grade['subject_id'], 'nome' => $grade['subject_name']];
                    unset($grade['subject_name'], $grade['subject_id']);
                }
                
                sendResponse($grades);
            } else if ($subjectFilter) {
                // Buscar notas de uma matéria
                $stmt = $conn->prepare("
                    SELECT g.*, u.nome as student_name 
                    FROM grades g
                    JOIN users u ON g.student_id = u.id
                    WHERE g.subject_id = ?
                    ORDER BY u.nome, g.exam_date DESC
                ");
                $stmt->execute([$subjectFilter]);
                $grades = $stmt->fetchAll();
                sendResponse($grades);
            } else if ($id) {
                // Buscar uma nota específica
                $stmt = $conn->prepare("SELECT * FROM grades WHERE id = ?");
                $stmt->execute([$id]);
                $grade = $stmt->fetch();
                
                if ($grade) {
                    sendResponse($grade);
                } else {
                    sendResponse(['success' => false, 'message' => 'Nota não encontrada'], 404);
                }
            } else {
                // Listar todas as notas
                $stmt = $conn->query("
                    SELECT g.*, u.nome as student_name, s.nome as subject_name 
                    FROM grades g
                    JOIN users u ON g.student_id = u.id
                    JOIN subjects s ON g.subject_id = s.id
                    ORDER BY g.exam_date DESC
                ");
                $grades = $stmt->fetchAll();
                sendResponse($grades);
            }
            break;
            
        case 'POST':
            // Criar nova nota
            $data = json_decode(file_get_contents('php://input'), true);
            
            if (!isset($data['student']) || !isset($data['subject']) || !isset($data['value'])) {
                sendResponse(['success' => false, 'message' => 'Aluno, matéria e valor são obrigatórios'], 400);
            }
            
            $studentId = is_array($data['student']) ? $data['student']['id'] : $data['student'];
            $subjectId = is_array($data['subject']) ? $data['subject']['id'] : $data['subject'];
            
            $stmt = $conn->prepare("
                INSERT INTO grades (student_id, subject_id, value, description, exam_date) 
                VALUES (?, ?, ?, ?, ?)
            ");
            $stmt->execute([
                $studentId,
                $subjectId,
                $data['value'],
                $data['description'] ?? null,
                $data['examDate'] ?? date('Y-m-d')
            ]);
            
            $newId = $conn->lastInsertId();
            sendResponse(['success' => true, 'id' => $newId, 'message' => 'Nota criada com sucesso'], 201);
            break;
            
        case 'PUT':
            // Atualizar nota
            if (!$id) {
                sendResponse(['success' => false, 'message' => 'ID é obrigatório'], 400);
            }
            
            $data = json_decode(file_get_contents('php://input'), true);
            
            $stmt = $conn->prepare("
                UPDATE grades 
                SET value = ?, description = ?, exam_date = ? 
                WHERE id = ?
            ");
            $stmt->execute([
                $data['value'],
                $data['description'] ?? null,
                $data['examDate'] ?? date('Y-m-d'),
                $id
            ]);
            
            sendResponse(['success' => true, 'message' => 'Nota atualizada com sucesso']);
            break;
            
        case 'DELETE':
            // Deletar nota
            if (!$id) {
                sendResponse(['success' => false, 'message' => 'ID é obrigatório'], 400);
            }
            
            $stmt = $conn->prepare("DELETE FROM grades WHERE id = ?");
            $stmt->execute([$id]);
            
            sendResponse(['success' => true, 'message' => 'Nota deletada com sucesso']);
            break;
            
        default:
            sendResponse(['success' => false, 'message' => 'Método não permitido'], 405);
    }
} catch(Exception $e) {
    sendResponse(['success' => false, 'message' => 'Erro: ' . $e->getMessage()], 500);
}
?>
