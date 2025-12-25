# ClasseConectada - Sistema Educacional (Frontend Puro)

Sistema completo de gestão escolar com HTML, CSS e JavaScript puro (sem backend).

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

- **Frontend:**
  - HTML5
  - CSS3
  - JavaScript (Vanilla)
  - LocalStorage para persistência de dados

## 🚀 Como Executar

### Opção 1: Abrir diretamente no navegador
1. Clone o repositório:
```bash
git clone https://github.com/onmikronDev/classeconectadaSpring.git
cd classeconectadaSpring
```

2. Abra o arquivo `index.html` no seu navegador preferido
   - Ou navegue diretamente para `html/Login.html`

### Opção 2: Usar um servidor HTTP local (Recomendado)

**Com Python 3:**
```bash
python -m http.server 8000
```

**Com Python 2:**
```bash
python -m SimpleHTTPServer 8000
```

**Com Node.js (usando npx):**
```bash
npx http-server -p 8000
```

**Com PHP:**
```bash
php -S localhost:8000
```

Depois acesse: http://localhost:8000

### 3. Faça Login

**Credenciais padrão:**
- **Email:** admin@email.com
- **Senha:** 123456

**Outros usuários disponíveis:**
- alice@email.com / 123456 (Aluna - Turma A)
- bruno@email.com / 123456 (Aluno - Turma A)
- carolina@email.com / 123456 (Aluna - Turma A)
- daniel@email.com / 123456 (Aluno - Turma B)
- eduarda@email.com / 123456 (Aluna - Turma B)
- felipe@email.com / 123456 (Aluno - Turma C)
- gabriela@email.com / 123456 (Aluna - Turma C)
- joao@email.com / 123456 (Professor - Turma A)
- ana@email.com / 123456 (Professora - Turma B)
- carlos@email.com / 123456 (Professor - Turma C)

## 📚 Estrutura do Projeto

```
classeconectadaSpring/
├── index.html                 # Página inicial de boas-vindas
├── html/                      # Páginas HTML
│   ├── Login.html            # Tela de login
│   ├── index.html            # Dashboard principal
│   ├── turma.html            # Gestão de turmas e alunos
│   ├── historico.html        # Histórico de notas do aluno
│   ├── cadrastro.html        # Cadastro de usuários
│   ├── usuarios.html         # Gerenciamento de usuários
│   └── observacoes.html      # Observações sobre alunos
├── css/                      # Arquivos de estilo
│   ├── login.css
│   ├── index.css
│   ├── turma.css
│   ├── historico.css
│   ├── cadrastro.css
│   └── usuarios.css
├── js/                       # Scripts JavaScript
│   ├── mockData.js           # Dados mock e persistência
│   ├── login.js              # Lógica de login
│   ├── index.js              # Dashboard e relatórios
│   ├── turma.js              # Gestão de turmas
│   ├── historico.js          # Histórico de notas
│   ├── cadrastro.js          # Cadastro de usuários
│   ├── usuarios.js           # Gerenciamento de usuários
│   └── observacoes.js        # Observações
└── img/                      # Imagens e logos
    └── classe-conectada-*.svg
```

## 🎯 Funcionalidades

### Telas do Sistema
- **Página Inicial** (index.html) - Boas-vindas e acesso ao login
- **Login** (Login.html) - Autenticação de usuários
- **Dashboard** (html/index.html) - Menu principal com relatórios
- **Turmas** (turma.html) - Listagem de turmas, alunos e aplicação de notas
- **Cadastro** (cadrastro.html) - Cadastro de professores, alunos e diretores
- **Usuários** (usuarios.html) - Gerenciamento e edição de usuários
- **Histórico** (historico.html) - Visualização de notas por aluno (requer seleção prévia)
- **Observações** (observacoes.html) - Observações sobre os alunos

### Recursos Implementados
- ✅ Sistema de login com autenticação
- ✅ Persistência de dados com LocalStorage
- ✅ CRUD completo de usuários (Criar, Ler, Atualizar, Desativar)
- ✅ Gestão de turmas e alunos
- ✅ Aplicação e visualização de notas
- ✅ Cálculo automático de médias
- ✅ Histórico de notas por aluno
- ✅ Sistema de observações
- ✅ Filtros e busca de usuários
- ✅ Validação de CPF
- ✅ Interface responsiva

### Regras de Negócio
- **Histórico**: Só é possível acessar o histórico se um aluno for selecionado primeiro na tela de Turmas
- **Notas**: Valores entre 0 e 10
- **Soft Delete**: Usuários são desativados, não deletados permanentemente
- **Senha Padrão**: Novos usuários cadastrados recebem a senha "123456"

## 🧪 Dados de Teste

A aplicação vem com dados pré-cadastrados:

**Turmas:** Turma A, Turma B, Turma C

**Matérias:** Matemática, Português, Ciências, Geografia, História

**Usuários:**
- 1 Diretor (admin@email.com)
- 3 Professores (cada um responsável por uma turma)
- 7 Alunos (distribuídos nas 3 turmas)

**Notas:** 20 notas distribuídas entre os alunos em diferentes matérias

**Observações:** 8 observações sobre diferentes alunos

### Como Resetar os Dados

Para voltar aos dados iniciais, abra o Console do navegador (F12) e execute:
```javascript
localStorage.removeItem('classeConectadaData');
location.reload();
```

## 💾 Persistência de Dados

Todos os dados são armazenados no LocalStorage do navegador:
- Os dados são mantidos mesmo após fechar o navegador
- Novos cadastros, edições e notas são persistidos automaticamente
- Os dados são específicos para cada navegador/computador

## 🔒 Segurança

⚠️ **NOTA DE SEGURANÇA:** Este sistema foi desenvolvido para fins educacionais e de demonstração:
- As senhas são armazenadas em texto simples
- Não há criptografia de dados
- Não deve ser usado em ambiente de produção sem melhorias de segurança

## 🌐 Navegadores Suportados

- Google Chrome (Recomendado)
- Mozilla Firefox
- Microsoft Edge
- Safari
- Opera

## 📱 Responsividade

O sistema é responsivo e funciona em:
- Desktops
- Tablets
- Smartphones

## 🐛 Resolução de Problemas

### Os dados não estão sendo salvos
- Verifique se o LocalStorage está habilitado no seu navegador
- Certifique-se de não estar em modo anônimo/privado

### A página não carrega corretamente
- Limpe o cache do navegador
- Verifique se todos os arquivos foram baixados corretamente
- Use um servidor HTTP local em vez de abrir diretamente

### Erro ao adicionar notas
- Certifique-se de selecionar uma turma e um aluno primeiro
- Verifique se a nota está entre 0 e 10

## 📄 Licença

Este projeto é de código aberto.

## 👥 Desenvolvedor

Desenvolvido por onmikronDev

## 📞 Suporte

Para problemas ou dúvidas, abra uma issue no repositório.

---

## ✨ Novidades desta Versão (Frontend Puro)

- ✅ Removido backend Spring Boot
- ✅ Removida dependência de banco de dados MySQL
- ✅ Implementado MockData com dados de demonstração
- ✅ Sistema de persistência com LocalStorage
- ✅ Aplicação totalmente funcional sem necessidade de servidor
- ✅ Mais leve e fácil de executar
- ✅ Perfeito para demonstrações e protótipos
