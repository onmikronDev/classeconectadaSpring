// Dados carregados do MockData
let usuarios = [];

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

// Carregar usuários do MockData
function carregarUsuarios() {
  usuarios = MockData.users.filter(u => u.active);
  renderTable();
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
  document.getElementById("editTurma").value = user.turma ? user.turma.name : "";
  document.getElementById("editMateria").value = "";

  updateEditFields();
  editModal.style.display = "flex";
}

// Make function globally accessible
window.openEditModal = openEditModal;

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

// Salvar edição
editForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const id = parseInt(document.getElementById("editId").value);

  const userIndex = MockData.users.findIndex(u => u.id === id);
  if (userIndex === -1) return;

  MockData.users[userIndex].nome = document.getElementById("editNome").value;
  MockData.users[userIndex].email = document.getElementById("editEmail").value;
  MockData.users[userIndex].telefone = document.getElementById("editTelefone").value;
  MockData.users[userIndex].tipo = document.getElementById("editTipo").value.toUpperCase();

  saveToLocalStorage();
  alert("Usuário atualizado com sucesso!");
  closeModal();
  carregarUsuarios();
});

// Excluir usuário (soft delete)
function deleteUser(id) {
  if (!confirm("Tem certeza que deseja excluir este usuário?")) {
    return;
  }

  const userIndex = MockData.users.findIndex(u => u.id === id);
  if (userIndex !== -1) {
    MockData.users[userIndex].active = false;
    saveToLocalStorage();
    alert("Usuário excluído com sucesso!");
    carregarUsuarios();
  }
}

// Make function globally accessible
window.deleteUser = deleteUser;

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

// Inicializar carregando dados
carregarUsuarios();
