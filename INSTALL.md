# Guia Rápido de Instalação - ClasseConectada

## Requisitos
- PHP 7.4+
- MySQL 8.0+
- Apache (opcional, mas recomendado)

## Instalação Rápida

### 1. Configurar o Banco de Dados MySQL

```bash
# Entre no MySQL
mysql -u root -p

# Execute o script de criação do banco
mysql -u root -p < database.sql
```

Ou importe o arquivo `database.sql` via phpMyAdmin.

### 2. Configurar Credenciais do MySQL

Edite `api/config.php` se suas credenciais forem diferentes:

```php
define('DB_HOST', 'localhost');
define('DB_USER', 'root');        // Seu usuário MySQL
define('DB_PASS', 'root');        // Sua senha MySQL
define('DB_NAME', 'classe_conectada');
```

### 3. Iniciar o Servidor

#### Opção A: Servidor PHP Embutido (Desenvolvimento)
```bash
php -S localhost:8000
```

Acesse: http://localhost:8000

#### Opção B: Apache/XAMPP/WAMP (Produção)
1. Copie a pasta do projeto para `htdocs` (XAMPP) ou `www` (WAMP)
2. Acesse: http://localhost/classeconectadaSpring

### 4. Login

Use as credenciais padrão:
- **Email:** admin@email.com
- **Senha:** 123456

## Estrutura do Projeto

```
classeconectadaSpring/
├── index.html          # Página inicial (redireciona para login)
├── database.sql        # Script SQL do banco de dados
├── .htaccess          # Rotas da API (Apache)
├── api/               # Backend PHP
│   ├── config.php     # Configuração do BD
│   ├── auth/          # Autenticação
│   ├── classes.php    # API de turmas
│   ├── students.php   # API de alunos
│   ├── users.php      # API de usuários
│   ├── subjects.php   # API de matérias
│   ├── grades.php     # API de notas
│   └── observations.php # API de observações
├── html/              # Páginas HTML
├── css/               # Estilos
├── js/                # Scripts JavaScript
└── img/               # Imagens
```

## Usuários de Teste

O banco de dados inclui os seguintes usuários de teste:

### Diretor
- Email: admin@email.com
- Senha: 123456

### Professores
- joao@email.com (Matemática)
- ana@email.com (Português)
- carlos@email.com (Ciências)
- Senha: 123456

### Alunos
- alice@email.com (Turma A)
- joao.aluno@email.com (Turma A)
- maria@email.com (Turma A)
- pedro@email.com (Turma A)
- julia@email.com (Turma B)
- lucas@email.com (Turma B)
- beatriz@email.com (Turma C)
- rafael@email.com (Turma C)
- Senha: 123456

## Funcionalidades

### Para Diretores e Professores
- ✅ Gerenciar turmas
- ✅ Adicionar/editar alunos
- ✅ Aplicar notas
- ✅ Adicionar observações
- ✅ Visualizar relatórios

### Para Alunos
- ✅ Ver suas notas
- ✅ Ver observações sobre seu desempenho
- ✅ Visualizar histórico acadêmico

## Resolução de Problemas

### Erro de conexão com o banco de dados
- Verifique se o MySQL está rodando
- Confirme as credenciais em `api/config.php`
- Certifique-se de que o banco `classe_conectada` foi criado

### Página em branco ou erro 404
- Verifique se está acessando a URL correta
- Se usar Apache, certifique-se de que mod_rewrite está habilitado
- Verifique permissões dos arquivos (755 para diretórios, 644 para arquivos)

### Erro de CORS
- Se usar servidor PHP embutido, não há problema de CORS
- Se usar Apache, verifique se o arquivo .htaccess está presente

## Tecnologias Utilizadas

- **Frontend:** HTML5, CSS3, JavaScript (Vanilla)
- **Backend:** PHP 7.4+ com PDO
- **Banco de Dados:** MySQL 8.0+
- **Servidor Web:** Apache ou PHP Built-in Server

## Segurança

⚠️ **IMPORTANTE:** Este sistema é para fins educacionais. Em produção:
- Use `password_hash()` para criptografar senhas
- Implemente autenticação JWT ou sessões seguras
- Use HTTPS
- Valide todas as entradas do usuário
- Implemente proteção contra SQL Injection (já incluída com PDO prepared statements)

## Suporte

Para dúvidas ou problemas, abra uma issue no repositório GitHub.
