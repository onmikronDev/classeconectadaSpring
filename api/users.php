<?php
require_once 'config.php';

$conn = getConnection();
$method = $_SERVER['REQUEST_METHOD'];

$uri = $_SERVER['REQUEST_URI'];
$uriParts = explode('/', trim($uri, '/'));

$id = isset($uriParts[count($uriParts) - 1]) && is_numeric($uriParts[count($uriParts) - 1])
    ? $uriParts[count($uriParts) - 1] 
    : null;

// Checar se há filtro por tipo
$tipoFilter = isset($_GET['tipo']) ? $_GET['tipo'] : null;
if (!$tipoFilter && strpos($uri, '/tipo/') !== false) {
    $tipoFilter = end($uriParts);
}

try {
    switch($method) {
        case 'GET':
            if ($tipoFilter) {
                // Buscar usuários por tipo
                $stmt = $conn->prepare("SELECT * FROM users WHERE tipo = ? AND ativo = 1 ORDER BY nome");
                $stmt->execute([strtoupper($tipoFilter)]);
                $users = $stmt->fetchAll();
                sendResponse($users);
            } else if ($id) {
                // Buscar um usuário específico
                $stmt = $conn->prepare("SELECT * FROM users WHERE id = ? AND ativo = 1");
                $stmt->execute([$id]);
                $user = $stmt->fetch();
                
                if ($user) {
                    sendResponse($user);
                } else {
                    sendResponse(['success' => false, 'message' => 'Usuário não encontrado'], 404);
                }
            } else {
                // Listar todos os usuários ativos
                $stmt = $conn->query("SELECT * FROM users WHERE ativo = 1 ORDER BY nome");
                $users = $stmt->fetchAll();
                sendResponse($users);
            }
            break;
            
        case 'POST':
            // Criar novo usuário
            $data = json_decode(file_get_contents('php://input'), true);
            
            if (!isset($data['nome']) || !isset($data['email']) || !isset($data['tipo'])) {
                sendResponse(['success' => false, 'message' => 'Nome, email e tipo são obrigatórios'], 400);
            }
            
            $stmt = $conn->prepare("
                INSERT INTO users (nome, email, senha, tipo, ativo) 
                VALUES (?, ?, ?, ?, 1)
            ");
            $stmt->execute([
                $data['nome'],
                $data['email'],
                $data['senha'] ?? '123456',
                strtoupper($data['tipo'])
            ]);
            
            $newId = $conn->lastInsertId();
            
            // Se for aluno, criar entrada na tabela students
            if (strtoupper($data['tipo']) === 'ALUNO') {
                $stmt = $conn->prepare("INSERT INTO students (id, matricula, school_class_id) VALUES (?, ?, ?)");
                $stmt->execute([
                    $newId,
                    $data['matricula'] ?? null,
                    $data['school_class_id'] ?? null
                ]);
            }
            // Se for professor, criar entrada na tabela teachers
            else if (strtoupper($data['tipo']) === 'PROFESSOR') {
                $stmt = $conn->prepare("INSERT INTO teachers (id, especialidade) VALUES (?, ?)");
                $stmt->execute([
                    $newId,
                    $data['especialidade'] ?? null
                ]);
            }
            // Se for diretor, criar entrada na tabela directors
            else if (strtoupper($data['tipo']) === 'DIRETOR') {
                $stmt = $conn->prepare("INSERT INTO directors (id) VALUES (?)");
                $stmt->execute([$newId]);
            }
            
            sendResponse(['success' => true, 'id' => $newId, 'message' => 'Usuário criado com sucesso'], 201);
            break;
            
        case 'PUT':
            // Atualizar usuário
            if (!$id) {
                sendResponse(['success' => false, 'message' => 'ID é obrigatório'], 400);
            }
            
            $data = json_decode(file_get_contents('php://input'), true);
            
            $stmt = $conn->prepare("UPDATE users SET nome = ?, email = ? WHERE id = ?");
            $stmt->execute([$data['nome'], $data['email'], $id]);
            
            // Atualizar senha se fornecida
            if (isset($data['senha']) && !empty($data['senha'])) {
                $stmt = $conn->prepare("UPDATE users SET senha = ? WHERE id = ?");
                $stmt->execute([$data['senha'], $id]);
            }
            
            sendResponse(['success' => true, 'message' => 'Usuário atualizado com sucesso']);
            break;
            
        case 'DELETE':
            // Desativar usuário (soft delete)
            if (!$id) {
                sendResponse(['success' => false, 'message' => 'ID é obrigatório'], 400);
            }
            
            $stmt = $conn->prepare("UPDATE users SET ativo = 0 WHERE id = ?");
            $stmt->execute([$id]);
            
            sendResponse(['success' => true, 'message' => 'Usuário desativado com sucesso']);
            break;
            
        default:
            sendResponse(['success' => false, 'message' => 'Método não permitido'], 405);
    }
} catch(Exception $e) {
    sendResponse(['success' => false, 'message' => 'Erro: ' . $e->getMessage()], 500);
}
?>
