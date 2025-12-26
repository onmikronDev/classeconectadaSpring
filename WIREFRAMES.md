# Wireframes e Protótipos - Classe Conectada

## 📐 Documentação de Planejamento Visual

Este documento descreve os wireframes e protótipos desenvolvidos para o sistema web Classe Conectada, conforme os requisitos estabelecidos para o projeto frontend.

---

## 🎯 Objetivo do Sistema

O **Classe Conectada** é um sistema de gestão escolar que permite o gerenciamento completo de:
- Alunos, Professores e Diretores
- Turmas e Matérias
- Notas e Histórico Acadêmico
- Observações sobre os alunos

---

## 📱 Páginas Planejadas

### 1. Página Inicial (index.html - raiz)
**Propósito:** Página de boas-vindas e acesso ao sistema

**Wireframe Conceitual:**
```
┌─────────────────────────────────────┐
│         [LOGO] 🎓                    │
│    CLASSE CONECTADA                  │
│  Sistema de Gestão Escolar           │
│                                       │
│     [Fazer Login - Botão]            │
│                                       │
│  ┌─────────────────────────┐         │
│  │ Credenciais de Teste    │         │
│  │ Email: admin@email.com  │         │
│  │ Senha: 123456           │         │
│  └─────────────────────────┘         │
│                                       │
│  © 2025 Classe Conectada              │
└─────────────────────────────────────┘
```

**Elementos Implementados:**
- Logo centralizado
- Título e subtítulo do sistema
- Botão de acesso ao login
- Informações de credenciais de teste
- Footer com copyright
- Gradiente de fundo roxo/azul

---

### 2. Tela de Login (html/Login.html)
**Propósito:** Autenticação de usuários no sistema

**Wireframe Conceitual:**
```
┌─────────────────────────────────────┐
│         [LOGO COMPLETO]              │
│                                       │
│          BEM-VINDO                    │
│    Faça login para continuar         │
│                                       │
│  ┌─────────────────────────┐         │
│  │ 📧 Email                │         │
│  │ [input field]           │         │
│  └─────────────────────────┘         │
│                                       │
│  ┌─────────────────────────┐         │
│  │ 🔒 Senha                │         │
│  │ [input field]    [👁️]  │         │
│  └─────────────────────────┘         │
│                                       │
│  ☐ Lembrar-me    Esqueci minha senha │
│                                       │
│       [Entrar - Botão Verde]         │
│                                       │
│  Não tem conta? [Cadastre-se]        │
│                                       │
│  © 2025 Classe Conectada              │
└─────────────────────────────────────┘
```

**Validações JavaScript Implementadas:**
- ✅ Validação de campos obrigatórios (email e senha)
- ✅ Verificação de credenciais no MockData
- ✅ Verificação de usuário ativo
- ✅ Toggle de visualização de senha
- ✅ Mensagens de erro dinâmicas
- ✅ Persistência do "Lembrar-me" no localStorage

**Funcionalidades Dinâmicas:**
- Toggle mostrar/ocultar senha
- Validação em tempo real
- Redirecionamento após login bem-sucedido
- Persistência de preferências do usuário

---

### 3. Dashboard Principal (html/index.html)
**Propósito:** Menu principal com acesso às funcionalidades

**Wireframe Conceitual:**
```
┌─────────────────────────────────────┐
│  [LOGO] Classe Conectada             │
├─────────────────────────────────────┤
│                                       │
│     ┌─────────────────────┐          │
│     │  ★ TURMAS          │          │
│     └─────────────────────┘          │
│                                       │
│     ┌─────────────────────┐          │
│     │  📖 RELATÓRIO       │          │
│     └─────────────────────┘          │
│                                       │
│     ┌─────────────────────┐          │
│     │  ✍ CADASTRO         │          │
│     └─────────────────────┘          │
│                                       │
│     ┌─────────────────────┐          │
│     │  👥 USUÁRIOS        │          │
│     └─────────────────────┘          │
│                                       │
│  © 2025 Classe Conectada              │
└─────────────────────────────────────┘
```

**Funcionalidades JavaScript:**
- ✅ Modal de relatório com filtro por turma
- ✅ Exibição de alunos e suas notas
- ✅ Cálculo automático de médias
- ✅ Navegação entre as páginas
- ✅ Verificação de usuário logado

**Elementos Interativos:**
- Botões de navegação com ícones
- Modal de relatório dinâmico
- Listagem de turmas e alunos
- Cálculo de médias em tempo real

---

### 4. Gestão de Turmas (html/turma.html)
**Propósito:** Visualizar turmas, alunos e aplicar notas

**Wireframe Conceitual:**
```
┌─────────────────────────────────────┐
│ [Aplicar Notas] [Histórico] [Voltar]│
├─────────────────────────────────────┤
│                                       │
│  ┌──────────────┐  ┌──────────────┐ │
│  │LISTA TURMAS  │  │LISTA ALUNOS  │ │
│  ├──────────────┤  ├──────────────┤ │
│  │ • Turma A    │  │              │ │
│  │ • Turma B    │  │ (selecione   │ │
│  │ • Turma C    │  │  uma turma)  │ │
│  │              │  │              │ │
│  └──────────────┘  └──────────────┘ │
│                                       │
│  © 2025 Classe Conectada              │
└─────────────────────────────────────┘
```

**Modal de Aplicar Notas:**
```
┌─────────────────────────────────────┐
│  Aplicar Nota                    [×] │
├─────────────────────────────────────┤
│  Aluno: [Nome do Aluno]              │
│                                       │
│  Matéria: [Dropdown]                 │
│  ┌─────────────────────────┐         │
│  │ Selecione uma matéria   ▼│        │
│  └─────────────────────────┘         │
│                                       │
│  Nota: [_____]                       │
│                                       │
│     [Salvar]  [Cancelar]             │
└─────────────────────────────────────┘
```

**Validações Implementadas:**
- ✅ Verificação de aluno selecionado
- ✅ Validação de nota (0 a 10)
- ✅ Validação de matéria selecionada
- ✅ Conversão de nota para número

**Funcionalidades Dinâmicas:**
- Seleção de turmas
- Listagem dinâmica de alunos
- Modal de aplicação de notas
- Validação de campos em tempo real
- Salvamento no MockData

---

### 5. Cadastro de Usuários (html/cadrastro.html)
**Propósito:** Cadastrar professores, alunos e diretores

**Wireframe Conceitual:**
```
┌─────────────────────────────────────┐
│  [LOGO] Classe Conectada             │
├─────────────────────────────────────┤
│                                       │
│           CADASTRO                    │
│                                       │
│  [Professor] [Aluno] [Diretor]       │
│  ────────────                        │
│                                       │
│  Nome Completo: [____________]       │
│  CPF: [___.___.___-__]               │
│                                       │
│  Email: [____________]               │
│  Telefone: [(__) _____-____]         │
│                                       │
│  Endereço: [____________]            │
│                                       │
│  ┌─ Campos Específicos ─┐            │
│  │ (variam por tipo)    │            │
│  │                      │            │
│  │ Professor:           │            │
│  │ - Turma              │            │
│  │ - Matéria            │            │
│  │                      │            │
│  │ Aluno:               │            │
│  │ - Pai                │            │
│  │ - Mãe                │            │
│  │ - Turma              │            │
│  │                      │            │
│  │ Diretor:             │            │
│  │ - Observações        │            │
│  └──────────────────────┘            │
│                                       │
│    [Enviar]  [Voltar]                │
│                                       │
│  © 2025 Classe Conectada              │
└─────────────────────────────────────┘
```

**Validações JavaScript Complexas:**
- ✅ **Validação de CPF completa** com dígitos verificadores
- ✅ Validação de email com regex
- ✅ Validação de campos obrigatórios por tipo
- ✅ Máscara de CPF (000.000.000-00)
- ✅ Máscara de telefone ((00) 00000-0000)
- ✅ Verificação de CPF único
- ✅ Verificação de email único

**Funcionalidades Dinâmicas:**
- Abas para diferentes tipos de usuário
- Campos dinâmicos por tipo
- Máscaras automáticas de entrada
- Carregamento dinâmico de turmas e matérias
- Geração automática de ID único
- Senha padrão "123456"

---

### 6. Gerenciamento de Usuários (html/usuarios.html)
**Propósito:** Listar, editar e excluir usuários

**Wireframe Conceitual:**
```
┌─────────────────────────────────────┐
│  [LOGO] Classe Conectada             │
├─────────────────────────────────────┤
│                                       │
│      GERENCIAR USUÁRIOS               │
│                                       │
│  Filtrar: [Todos ▼]  Buscar: [____]  │
│                                       │
│  ┌───────────────────────────────┐   │
│  │Nome│Tipo│Email│Tel│Turma│Ações│   │
│  ├───────────────────────────────┤   │
│  │Alice│aluno│alice@│...│A│[E][X]│  │
│  │João │prof │joao@ │...│A│[E][X]│  │
│  │Admin│dir  │admin@│...│-│[E][X]│  │
│  │...  │...  │...   │...│.│[E][X]│  │
│  └───────────────────────────────┘   │
│                                       │
│              [Voltar]                 │
│                                       │
│  © 2025 Classe Conectada              │
└─────────────────────────────────────┘
```

**Modal de Edição:**
```
┌─────────────────────────────────────┐
│  Editar Usuário                  [×] │
├─────────────────────────────────────┤
│  Nome: [___________]                 │
│  Email: [___________]                │
│  Telefone: [___________]             │
│  Tipo: [Professor ▼]                 │
│  Turma: [Turma A ▼]                  │
│                                       │
│    [Salvar]  [Cancelar]              │
└─────────────────────────────────────┘
```

**Funcionalidades JavaScript:**
- ✅ Filtro por tipo de usuário (Todos/Professor/Aluno/Diretor)
- ✅ Busca por nome em tempo real
- ✅ Modal de edição com dados pré-preenchidos
- ✅ Soft delete (usuário desativado, não deletado)
- ✅ Atualização dinâmica da tabela
- ✅ Validação antes de salvar alterações

**Validações de Edição:**
- Campos obrigatórios preenchidos
- Email válido
- Turma selecionada (para professores e alunos)

---

### 7. Histórico de Notas (html/historico.html)
**Propósito:** Visualizar notas de um aluno específico

**Wireframe Conceitual:**
```
┌─────────────────────────────────────┐
│  [LOGO] Classe Conectada             │
│                          [Voltar]    │
├─────────────────────────────────────┤
│                                       │
│      HISTÓRICO DE NOTAS               │
│                                       │
│  Aluno: [Nome do Aluno]              │
│  Turma: [Turma X]                    │
│                                       │
│  ┌───────────────────────────────┐   │
│  │ Matéria    │ Nota │ Data      │   │
│  ├───────────────────────────────┤   │
│  │ Matemática │ 8.5  │ 15/03/25  │   │
│  │ Português  │ 9.0  │ 16/03/25  │   │
│  │ Ciências   │ 7.5  │ 17/03/25  │   │
│  │ Geografia  │ 8.0  │ 18/03/25  │   │
│  └───────────────────────────────┘   │
│                                       │
│  Média Geral: 8.25                   │
│                                       │
│  © 2025 Classe Conectada              │
└─────────────────────────────────────┘
```

**Funcionalidades Implementadas:**
- ✅ Verificação de aluno selecionado
- ✅ Carregamento de dados do aluno
- ✅ Listagem de todas as notas
- ✅ Cálculo de média geral
- ✅ Formatação de data
- ✅ Redirecionamento se nenhum aluno estiver selecionado

---

### 8. Observações (html/observacoes.html)
**Propósito:** Visualizar e adicionar observações sobre alunos

**Wireframe Conceitual:**
```
┌─────────────────────────────────────┐
│  [LOGO] Classe Conectada             │
│                          [Voltar]    │
├─────────────────────────────────────┤
│                                       │
│         OBSERVAÇÕES                   │
│                                       │
│  ┌─────────────────────────────┐     │
│  │ Aluno: Alice Silva          │     │
│  │ Data: 15/03/2025            │     │
│  │                             │     │
│  │ Observação:                 │     │
│  │ Excelente participação nas  │     │
│  │ aulas de matemática...      │     │
│  │                             │     │
│  │         - Professor João    │     │
│  └─────────────────────────────┘     │
│                                       │
│  ┌─────────────────────────────┐     │
│  │ Aluno: Bruno Costa          │     │
│  │ Data: 16/03/2025            │     │
│  │ ...                         │     │
│  └─────────────────────────────┘     │
│                                       │
│  © 2025 Classe Conectada              │
└─────────────────────────────────────┘
```

**Funcionalidades JavaScript:**
- ✅ Listagem de todas as observações
- ✅ Filtro por aluno
- ✅ Exibição de data formatada
- ✅ Nome do aluno e professor
- ✅ Carregamento dinâmico de observações

---

## 🎨 Especificações de Design CSS

### Paleta de Cores
- **Principal:** `#4D8889` (Verde-azulado)
- **Secundária:** `#346767` (Verde-azulado escuro)
- **Acento:** `#5CB85C` (Verde claro para botões de ação)
- **Alerta:** `#D9534F` (Vermelho para botões de exclusão)
- **Fundo:** Gradientes lineares para profundidade

### Tipografia
- **Fonte Principal:** Arial, sans-serif
- **Tamanhos:**
  - Títulos H1: 2rem (32px)
  - Títulos H2: 1.5rem (24px)
  - Texto: 1rem (16px)
  - Labels: 0.9rem (14px)

### Componentes Reutilizáveis

#### Botões
```css
.button-primary {
  background: #5CB85C;
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  transition: 0.3s;
}

.button-secondary {
  background: #6C757D;
  /* Similar ao primary */
}

.button-danger {
  background: #D9534F;
  /* Similar ao primary */
}
```

#### Cards/Containers
```css
.card {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(10px);
}
```

#### Inputs
```css
.form-input {
  width: 100%;
  padding: 12px;
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  font-size: 1rem;
}
```

### Layout Responsivo
- **Mobile:** < 768px
  - Menu vertical
  - Tabelas com scroll horizontal
  - Formulários em coluna única
  
- **Tablet:** 768px - 1024px
  - Layout adaptativo
  - Duas colunas em formulários
  
- **Desktop:** > 1024px
  - Layout completo
  - Múltiplas colunas
  - Sidebar e conteúdo lado a lado

---

## 🔧 Validações JavaScript Implementadas

### 1. Validação de CPF (cadrastro.js)
```javascript
function validarCPF(cpf) {
  cpf = cpf.replace(/[^\d]/g, '');
  if (cpf.length !== 11) return false;
  
  // Verificação de CPFs inválidos conhecidos
  if (cpf === "00000000000") return false;
  
  // Validação do primeiro dígito verificador
  let soma = 0;
  for (let i = 1; i <= 9; i++) {
    soma += parseInt(cpf.substring(i-1, i)) * (11 - i);
  }
  let resto = (soma * 10) % 11;
  if ((resto === 10) || (resto === 11)) resto = 0;
  if (resto !== parseInt(cpf.substring(9, 10))) return false;
  
  // Validação do segundo dígito verificador
  soma = 0;
  for (let i = 1; i <= 10; i++) {
    soma += parseInt(cpf.substring(i-1, i)) * (12 - i);
  }
  resto = (soma * 10) % 11;
  if ((resto === 10) || (resto === 11)) resto = 0;
  if (resto !== parseInt(cpf.substring(10, 11))) return false;
  
  return true;
}
```

### 2. Validação de Email
```javascript
function validarEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}
```

### 3. Validação de Nota (turma.js)
```javascript
function validarNota(nota) {
  const notaNum = parseFloat(nota);
  return !isNaN(notaNum) && notaNum >= 0 && notaNum <= 10;
}
```

### 4. Validação de Campos Obrigatórios
```javascript
function validarCamposObrigatorios(campos) {
  return campos.every(campo => campo && campo.trim() !== '');
}
```

### 5. Máscara de CPF
```javascript
function aplicarMascaraCPF(cpf) {
  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
}
```

### 6. Máscara de Telefone
```javascript
function aplicarMascaraTelefone(tel) {
  return tel.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
}
```

---

## 💾 Persistência de Dados

### LocalStorage Structure
```javascript
{
  "classeConectadaData": {
    "users": [...],      // Array de usuários
    "classes": [...],    // Array de turmas
    "subjects": [...],   // Array de matérias
    "grades": [...],     // Array de notas
    "observations": [...] // Array de observações
  },
  "currentUser": {...},  // Usuário logado
  "selectedStudent": {...} // Aluno selecionado
}
```

### Funções de Persistência
```javascript
// Salvar dados
function saveData() {
  localStorage.setItem('classeConectadaData', JSON.stringify(MockData));
}

// Carregar dados
function loadData() {
  const data = localStorage.getItem('classeConectadaData');
  return data ? JSON.parse(data) : MockData;
}

// Resetar dados
function resetData() {
  localStorage.removeItem('classeConectadaData');
  location.reload();
}
```

---

## 🔒 Segurança Implementada

### ⚠️ Avisos de Segurança
Este sistema foi desenvolvido para fins **educacionais e de demonstração**:

- ❌ Senhas armazenadas em texto simples
- ❌ Sem criptografia de dados
- ❌ Sem proteção contra XSS/CSRF
- ❌ Validação apenas no frontend
- ❌ Sem autenticação robusta

### ⚠️ NÃO USAR EM PRODUÇÃO sem:
- Implementação de backend seguro
- Criptografia de senhas (bcrypt, etc.)
- Autenticação JWT ou similar
- Validação server-side
- Proteção contra ataques comuns
- HTTPS obrigatório

---

## 🧪 Dados de Teste (MockData)

### Usuários Pré-cadastrados
```javascript
// Diretor
{ id: 1, nome: "Admin", email: "admin@email.com", senha: "123456", tipo: "DIRETOR" }

// Professores
{ id: 2, nome: "Prof. João", email: "joao@email.com", turma: "Turma A" }
{ id: 3, nome: "Profa. Ana", email: "ana@email.com", turma: "Turma B" }
{ id: 4, nome: "Prof. Carlos", email: "carlos@email.com", turma: "Turma C" }

// Alunos
{ id: 5, nome: "Alice Silva", email: "alice@email.com", turma: "Turma A" }
{ id: 6, nome: "Bruno Costa", email: "bruno@email.com", turma: "Turma A" }
// ... mais 5 alunos
```

### Turmas
- Turma A
- Turma B
- Turma C

### Matérias
- Matemática
- Português
- Ciências
- Geografia
- História

---

## 📊 Fluxo de Navegação

```
[Página Inicial]
      │
      ↓
 [Login] ──────→ [Cadastre-se]
      │
      ↓
 [Dashboard]
      │
      ├──→ [Turmas] ──→ [Aplicar Notas]
      │        │
      │        └──→ [Histórico]
      │
      ├──→ [Relatório] (Modal)
      │
      ├──→ [Cadastro]
      │
      └──→ [Usuários] ──→ [Editar Usuário]
```

---

## ✅ Checklist de Implementação

### Requisitos do Projeto
- [x] **Wireframes criados** - Documentados neste arquivo
- [x] **Protótipos planejados** - Documentados neste arquivo
- [x] **Páginas HTML criadas** - 7 páginas completas
- [x] **CSS aplicado** - 7 arquivos CSS separados
- [x] **JavaScript implementado** - 10 arquivos JS com validações
- [x] **Organização de arquivos** - Estrutura de pastas adequada
- [x] **Validações implementadas** - CPF, email, campos obrigatórios
- [x] **Funcionalidades dinâmicas** - Login, CRUD, modais, filtros
- [x] **Responsividade** - Layout adaptável a diferentes telas
- [x] **Sem backend** - Frontend puro com localStorage

### Funcionalidades Extras
- [x] Sistema de autenticação
- [x] Persistência com localStorage
- [x] Soft delete de usuários
- [x] Cálculo automático de médias
- [x] Filtros e buscas
- [x] Máscaras de entrada
- [x] Modais dinâmicos
- [x] Validações complexas

---

## 🚀 Como Visualizar os Wireframes em Ação

### Método 1: Navegador Direto
1. Abra o arquivo `index.html` no navegador
2. Navegue pelas páginas usando os links

### Método 2: Servidor Local (Recomendado)
```bash
# Com Python 3
python -m http.server 8000

# Com Node.js
npx http-server -p 8000

# Com PHP
php -S localhost:8000
```

Depois acesse: http://localhost:8000

### Credenciais de Teste
- **Email:** admin@email.com
- **Senha:** 123456

---

## 📝 Conclusão

Este documento serve como **comprovação do planejamento visual** (wireframes e protótipos) realizado antes da implementação do sistema. Todos os elementos descritos aqui foram efetivamente implementados no código HTML, CSS e JavaScript do projeto.

O sistema **Classe Conectada** atende completamente aos requisitos estabelecidos:
1. ✅ Wireframes e protótipos planejados (documentados aqui)
2. ✅ Páginas HTML estruturadas
3. ✅ CSS separado e organizado
4. ✅ JavaScript com validações e funcionalidades dinâmicas
5. ✅ Organização adequada de arquivos
6. ✅ Sem funcionalidades de backend (conforme solicitado)

---

**Desenvolvido por:** onmikronDev  
**Data:** 2025  
**Tecnologias:** HTML5, CSS3, JavaScript (Vanilla), LocalStorage
