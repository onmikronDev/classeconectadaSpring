// ✅ CORRIGIDO: Dados carregados da API
let usuarios = [];
let turmas = [];
let materias = [];

let currentEditId = null;

// Elementos do DOM
const tableBody = document.getElementById("usuariosTableBody");
const filterTipo = document.getElementById("filterTipo");
const searchNome = document.getElementById("searchNome");
const editModal = document.getElementById("editModal");
const closeEditModal = document.getElementById("closeEditModal");
const cancelEdit = document.getElementById("cancelEdit");
const editForm = document.getElementById("editForm");
const editTipo = document.getElementById("editTipo");
const editTurmaGroup = document.getElementById("editTurmaGroup");
const editMateriaGroup = document.getElementById("editMateriaGroup");

// ✅ CORRIGIDO: Carregar usuários da API
async function carregarUsuarios() {
  try {
    const response = await fetch('http://localhost:8080/api/users');
    if (!response.ok) throw new Error('Erro ao carregar usuários');
    
    usuarios = await response.json();
    renderTable();
  } catch (error) {
    console.error('Erro ao carregar usuários:', error);
    alert('Erro ao carregar usuários. Verifique se o backend está rodando.');
  }
}

// Carregar turmas da API
async function carregarTurmas() {
  try {
    const response = await fetch('http://localhost:8080/api/classes');
    if (!response.ok) throw new Error('Erro ao carregar turmas');
    
    turmas = await response.json();
  } catch (error) {
    console.error('Erro ao carregar turmas:', error);
  }
}

// Carregar matérias da API
async function carregarMaterias() {
  try {
    const response = await fetch('http://localhost:8080/api/subjects');
    if (!response.ok) throw new Error('Erro ao carregar matérias');
    
    materias = await response.json();
  } catch (error) {
    console.error('Erro ao carregar matérias:', error);
  }
}

// Renderizar tabela
function renderTable(filteredUsers = usuarios) {
  tableBody.innerHTML = "";

  if (filteredUsers.length === 0) {
    tableBody.innerHTML = `<tr><td colspan="6" style="text-align: center;">Nenhum usuário encontrado</td></tr>`;
    return;
  }

  filteredUsers.forEach(user => {
    const row = document.createElement("tr");
    const turmaInfo = user.turma ? user.turma.name : "N/A";
    const tipoDisplay = user.tipo ? user.tipo.toLowerCase() : "N/A";
    
    row.innerHTML = `
      <td>${user.nome}</td>
      <td><span class="badge ${tipoDisplay}">${tipoDisplay}</span></td>
      <td>${user.email}</td>
      <td>${user.telefone || "N/A"}</td>
      <td>${turmaInfo}</td>
      <td>
        <div class="action-buttons">
          <button class="edit-btn" onclick="openEditModal(${user.id})">Editar</button>
          <button class="delete-btn" onclick="deleteUser(${user.id})">Excluir</button>
        </div>
      </td>
    `;
    tableBody.appendChild(row);
  });
}

// Filtrar usuários
function filterUsers() {
  const tipoFilter = filterTipo.value;
  const nomeFilter = searchNome.value.toLowerCase();

  const filtered = usuarios.filter(user => {
    const matchTipo = tipoFilter === "todos" || user.tipo.toLowerCase() === tipoFilter;
    const matchNome = user.nome.toLowerCase().includes(nomeFilter);
    return matchTipo && matchNome;
  });

  renderTable(filtered);
}

// Abrir modal de edição
function openEditModal(id) {
  const user = usuarios.find(u => u.id === id);
  if (!user) return;

  currentEditId = id;
  document.getElementById("editId").value = user.id;
  document.getElementById("editNome").value = user.nome;
  document.getElementById("editEmail").value = user.email;
  document.getElementById("editTelefone").value = user.telefone || "";
  document.getElementById("editTipo").value = user.tipo.toLowerCase();
  
  // Preencher dropdowns
  preencherDropdownTurmas();
  preencherDropdownMaterias();
  
  // Selecionar valores atuais
  if (user.turma) {
    document.getElementById("editTurma").value = user.turma.id;
  }
  
  updateEditFields();
  editModal.style.display = "flex";
}

// Preencher dropdown de turmas
function preencherDropdownTurmas() {
  const select = document.getElementById("editTurma");
  select.innerHTML = '<option value="">Selecione uma turma</option>';
  
  turmas.forEach(turma => {
    const option = document.createElement("option");
    option.value = turma.id;
    option.textContent = turma.name;
    select.appendChild(option);
  });
}

// Preencher dropdown de matérias
function preencherDropdownMaterias() {
  const select = document.getElementById("editMateria");
  select.innerHTML = '<option value="">Selecione uma matéria</option>';
  
  materias.forEach(materia => {
    const option = document.createElement("option");
    option.value = materia.id;
    option.textContent = materia.name;
    select.appendChild(option);
  });
}

// Atualizar campos dinâmicos no modal
function updateEditFields() {
  const tipo = editTipo.value;
  editTurmaGroup.style.display = tipo === "professor" || tipo === "aluno" ? "flex" : "none";
  editMateriaGroup.style.display = tipo === "professor" ? "flex" : "none";
}

// Fechar modal
function closeModal() {
  editModal.style.display = "none";
  currentEditId = null;
}

// ✅ CORRIGIDO: Salvar edição via API
editForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const id = parseInt(document.getElementById("editId").value);
  const tipo = document.getElementById("editTipo").value.toUpperCase();

  const userData = {
    nome: document.getElementById("editNome").value,
    email: document.getElementById("editEmail").value,
    telefone: document.getElementById("editTelefone").value,
    tipo: tipo,
    cpf: usuarios.find(u => u.id === id)?.cpf || ""
  };
  
  // Adicionar turmaId se aplicável
  const turmaId = document.getElementById("editTurma").value;
  if (turmaId && (tipo === "ALUNO" || tipo === "PROFESSOR")) {
    userData.turmaId = parseInt(turmaId);
  }

  try {
    const response = await fetch(`http://localhost:8080/api/users/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });

    if (response.ok) {
      alert("Usuário atualizado com sucesso!");
      closeModal();
      await carregarUsuarios();
    } else {
      const error = await response.json();
      alert(`Erro ao atualizar: ${error.error || 'Erro desconhecido'}`);
    }
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error);
    alert('Erro ao conectar com o servidor.');
  }
});

// ✅ CORRIGIDO: Excluir usuário via API
async function deleteUser(id) {
  if (!confirm("Tem certeza que deseja excluir este usuário?")) {
    return;
  }

  try {
    const response = await fetch(`http://localhost:8080/api/users/${id}`, {
      method: 'DELETE'
    });

    if (response.ok || response.status === 204) {
      alert("Usuário excluído com sucesso!");
      await carregarUsuarios();
    } else {
      alert('Erro ao excluir usuário.');
    }
  } catch (error) {
    console.error('Erro ao excluir usuário:', error);
    alert('Erro ao conectar com o servidor.');
  }
}

// Event Listeners
filterTipo.addEventListener("change", filterUsers);
searchNome.addEventListener("input", filterUsers);
closeEditModal.addEventListener("click", closeModal);
cancelEdit.addEventListener("click", closeModal);
editTipo.addEventListener("change", updateEditFields);

// Fechar modal ao clicar fora
window.addEventListener("click", (e) => {
  if (e.target === editModal) {
    closeModal();
  }
});

// ✅ CORRIGIDO: Inicializar carregando dados da API
async function inicializar() {
  await carregarUsuarios();
  await carregarTurmas();
  await carregarMaterias();
}

inicializar();
