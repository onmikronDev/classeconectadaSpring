# ClasseConectada - Sistema Educacional

Sistema completo de gestão escolar com HTML, CSS e JavaScript puro (sem backend).

## 📋 Descrição

ClasseConectada é um sistema educacional frontend que permite gerenciar:
- 👨‍🎓 Alunos
- 👨‍🏫 Professores
- 👔 Diretores
- 📚 Turmas
- 📖 Matérias/Disciplinas
- 📊 Notas
- 📝 Observações

Todos os dados são armazenados localmente no navegador usando **localStorage**.

## 🛠️ Tecnologias Utilizadas

- **HTML5** - Estrutura das páginas
- **CSS3** - Estilização
- **JavaScript (Vanilla)** - Lógica e interatividade
- **localStorage** - Armazenamento de dados local

## 📦 Pré-requisitos

- Um navegador web moderno (Chrome, Firefox, Edge, Safari)
- Nenhum servidor ou banco de dados necessário!

## 🚀 Como Executar

### Opção 1: Abrir diretamente no navegador
1. Clone o repositório:
```bash
git clone https://github.com/onmikronDev/classeconectadaSpring.git
cd classeconectadaSpring
```

2. Abra o arquivo `index.html` diretamente no navegador ou navegue até a pasta `html` e abra `Login.html`

### Opção 2: Usando um servidor HTTP simples (recomendado)

#### Python:
```bash
python -m http.server 8000
```

#### Node.js:
```bash
npx http-server -p 8000
```

#### PHP:
```bash
php -S localhost:8000
```

Depois acesse: **http://localhost:8000**

## 🎯 Login Padrão

Use qualquer uma das seguintes credenciais (senha padrão: **123456** para todos):

### Diretor
- Email: admin@email.com

### Professores
- joao@email.com
- ana@email.com
- carlos@email.com

### Alunos
- alice@email.com
- joao.aluno@email.com
- maria@email.com
- pedro@email.com

## 📚 Estrutura do Projeto

```
classeconectadaSpring/
├── index.html              # Redireciona para login
├── html/                   # Páginas HTML
├── css/                    # Estilos CSS
├── js/                     # Scripts JavaScript
│   └── mockData.js         # Dados e funções localStorage
└── img/                    # Imagens
```

## 🎯 Funcionalidades

- ✅ Interface 100% funcional sem backend
- ✅ Dados persistem no navegador (localStorage)
- ✅ Autenticação com validação
- ✅ CRUD completo de usuários
- ✅ Gerenciamento de turmas e alunos
- ✅ Sistema de notas (0-10)
- ✅ Sistema de observações

## 🔄 Resetar Dados

Para resetar todos os dados:
1. Console do navegador (F12)
2. Digite: `localStorage.clear()`
3. Recarregue a página

## ⚠️ Observações

- Dados armazenados localmente no navegador
- Sistema de demonstração
- Senhas em texto simples (não usar em produção)

## 📄 Licença

Código aberto para fins educacionais.

## 👥 Autor

Desenvolvido por onmikronDev
