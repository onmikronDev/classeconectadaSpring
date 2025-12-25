<?php
require_once '../config.php';

$conn = getConnection();

// Roteamento baseado no método HTTP e parâmetros
$method = $_SERVER['REQUEST_METHOD'];

try {
    switch($method) {
        case 'POST':
            // Login
            $data = json_decode(file_get_contents('php://input'), true);
            
            if (!isset($data['email']) || !isset($data['senha'])) {
                sendResponse([
                    'success' => false,
                    'message' => 'Email e senha são obrigatórios'
                ], 400);
            }
            
            $email = $data['email'];
            $senha = $data['senha'];
            
            // Buscar usuário
            $stmt = $conn->prepare("
                SELECT id, nome, email, tipo, ativo 
                FROM users 
                WHERE email = ? AND senha = ? AND ativo = 1
            ");
            $stmt->execute([$email, $senha]);
            $user = $stmt->fetch();
            
            if ($user) {
                sendResponse([
                    'success' => true,
                    'message' => 'Login realizado com sucesso',
                    'user' => $user
                ]);
            } else {
                sendResponse([
                    'success' => false,
                    'message' => 'Email ou senha incorretos'
                ], 401);
            }
            break;
            
        default:
            sendResponse([
                'success' => false,
                'message' => 'Método não permitido'
            ], 405);
    }
} catch(Exception $e) {
    sendResponse([
        'success' => false,
        'message' => 'Erro: ' . $e->getMessage()
    ], 500);
}
?>
