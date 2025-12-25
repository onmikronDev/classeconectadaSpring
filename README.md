# ClasseConectada - Sistema Educacional

Sistema completo de gestão escolar com PHP + MySQL + HTML/CSS/JS

## 📋 Descrição

ClasseConectada é um sistema educacional moderno que permite gerenciar:
- 👨‍🎓 Alunos
- 👨‍🏫 Professores
- 👔 Diretores
- 📚 Turmas
- 📖 Matérias/Disciplinas
- 📊 Notas
- 📝 Observações

## 🛠️ Tecnologias Utilizadas

- **Backend:**
  - PHP 7.4+ (com PDO)
  - MySQL 8.x

- **Frontend:**
  - HTML5
  - CSS3
  - JavaScript (Vanilla)

## 📦 Pré-requisitos

- PHP 7.4 ou superior
- MySQL 8.0+ (rodando em localhost:3306)
- Apache ou servidor web com suporte a PHP
- Usuário MySQL: `root` / Senha: `root` (ou configure no api/config.php)

## 🚀 Como Executar

### 1. Clone o repositório
```bash
git clone https://github.com/onmikronDev/classeconectadaSpring.git
cd classeconectadaSpring
```

### 2. Configure o MySQL

Certifique-se de que o MySQL está rodando e execute o script de criação do banco de dados:

```bash
mysql -u root -p < database.sql
```

Ou importe o arquivo `database.sql` usando o phpMyAdmin ou outro cliente MySQL.

### 3. Configure a conexão com o banco de dados

Edite o arquivo `api/config.php` se necessário para ajustar as credenciais do MySQL:

```php
define('DB_HOST', 'localhost');
define('DB_USER', 'root');
define('DB_PASS', 'root');
define('DB_NAME', 'classe_conectada');
```

### 4. Inicie o servidor

#### Opção A: Usando o servidor embutido do PHP
```bash
php -S localhost:8000
```

#### Opção B: Usando Apache/XAMPP/WAMP
- Copie o projeto para o diretório htdocs (XAMPP) ou www (WAMP)
- Acesse via http://localhost/classeconectadaSpring

### 5. Acesse a aplicação
- Frontend: http://localhost:8000/ (ou http://localhost/classeconectadaSpring)
- A aplicação redirecionará automaticamente para a página de login

### 6. Login Padrão
- **Email:** admin@email.com
- **Senha:** 123456

## 📚 Estrutura do Projeto

```
classeconectadaSpring/
├── index.html                    # Página principal (redireciona para login)
├── database.sql                  # Script de criação do banco de dados
├── .htaccess                     # Configuração de rotas (Apache)
├── api/                          # Backend PHP
│   ├── config.php                # Configuração do banco de dados
│   ├── auth/
│   │   └── login.php             # Endpoint de autenticação
│   ├── classes.php               # Endpoint de turmas
│   ├── students.php              # Endpoint de alunos
│   ├── users.php                 # Endpoint de usuários
│   ├── subjects.php              # Endpoint de matérias
│   ├── grades.php                # Endpoint de notas
│   └── observations.php          # Endpoint de observações
├── html/                         # Páginas HTML
│   ├── Login.html                # Página de login
│   ├── index.html                # Dashboard principal
│   ├── turma.html                # Gestão de turmas
│   ├── cadrastro.html            # Cadastro de usuários
│   ├── usuarios.html             # Gerenciamento de usuários
│   ├── historico.html            # Histórico de notas
│   └── observacoes.html          # Observações sobre alunos
├── css/                          # Estilos CSS
├── js/                           # Scripts JavaScript
└── img/                          # Imagens e logos
```

## 🎯 Funcionalidades

### Telas do Sistema
- **Login** (Login.html) - Autenticação de usuários
- **Dashboard** (index.html) - Menu principal
- **Turmas** (turma.html) - Gestão de turmas e alunos
- **Cadastro** (cadrastro.html) - Cadastro de usuários
- **Usuários** (usuarios.html) - Gerenciamento de usuários
- **Histórico** (historico.html) - Notas e histórico do aluno
- **Observações** (observacoes.html) - Observações sobre alunos

### Recursos do Sistema
- ✅ API REST completa com CRUD
- ✅ Conexão com MySQL via PDO
- ✅ Validação de dados
- ✅ Soft Delete (campo ativo)
- ✅ CORS habilitado para frontend
- ✅ Dados iniciais automáticos
- ✅ Validação de notas (0-10)
- ✅ Interface responsiva

## 🧪 Dados de Teste

A aplicação carrega automaticamente dados de teste na primeira execução do script SQL:

**Turmas:** Turma A, Turma B, Turma C

**Matérias:** Matemática, Português, Ciências, Geografia, História

**Usuários:**
- Diretor: admin@email.com / 123456
- Professores: joao@email.com, ana@email.com, carlos@email.com
- Alunos: alice@email.com, joao.aluno@email.com, maria@email.com, pedro@email.com, etc.

**Senha padrão para todos:** 123456

⚠️ **NOTA DE SEGURANÇA:** Este sistema utiliza senhas em texto simples para fins educacionais e de demonstração. Em um ambiente de produção, as senhas devem ser criptografadas usando password_hash() do PHP.

## 🐛 Resolução de Problemas

### Erro de conexão com MySQL
- Verifique se o MySQL está rodando
- Confirme as credenciais em api/config.php
- Certifique-se de que a porta 3306 está acessível
- Verifique se o banco de dados 'classe_conectada' foi criado

### Porta 8000 já em uso
- Use outra porta: `php -S localhost:8080`
- Ou pare o processo que está usando a porta 8000

### Erro de CORS
- Se estiver usando Apache, certifique-se de que mod_rewrite está habilitado
- Verifique se o arquivo .htaccess está presente no diretório raiz

### Erro 404 nas requisições da API
- Verifique se o mod_rewrite do Apache está habilitado
- Ou acesse diretamente os arquivos PHP com extensão .php

## 📄 Licença

Este projeto é de código aberto.

## 👥 Contribuidores

Desenvolvido por onmikronDev

## 📞 Suporte

Para problemas ou dúvidas, abra uma issue no repositório.
