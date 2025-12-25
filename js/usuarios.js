// Dados de usuários (carregados do localStorage)
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

// Carregar usuários do localStorage
function loadUsers() {
  usuarios = dataManager.getUsuarios();
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
    row.innerHTML = `
      <td>${user.nome}</td>
      <td><span class="badge ${user.tipo}">${user.tipo}</span></td>
      <td>${user.email}</td>
      <td>${user.telefone}</td>
      <td>${user.tipo === "professor" ? `${user.turma || "N/A"} - ${user.materia || "N/A"}` : user.tipo === "aluno" ? user.turma || "N/A" : "N/A"}</td>
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
    const matchTipo = tipoFilter === "todos" || user.tipo === tipoFilter;
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
  document.getElementById("editTelefone").value = user.telefone;
  document.getElementById("editTipo").value = user.tipo;
  document.getElementById("editTurma").value = user.turma || "";
  document.getElementById("editMateria").value = user.materia || "";

  updateEditFields();
  editModal.style.display = "flex";
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

// Salvar edição
editForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const id = parseInt(document.getElementById("editId").value);
  const user = usuarios.find(u => u.id === id);

  if (user) {
    const updatedUser = {
      ...user,
      nome: document.getElementById("editNome").value,
      email: document.getElementById("editEmail").value,
      telefone: document.getElementById("editTelefone").value,
      tipo: document.getElementById("editTipo").value.toUpperCase(),
      turma: document.getElementById("editTurma").value,
      materia: document.getElementById("editMateria").value
    };

    // Atualizar no localStorage
    const allUsuarios = dataManager.getUsuarios();
    const index = allUsuarios.findIndex(u => u.id === id);
    if (index !== -1) {
      allUsuarios[index] = updatedUser;
      dataManager.setUsuarios(allUsuarios);
      loadUsers();
      closeModal();
      alert("Usuário atualizado com sucesso!");
    }
  }
});

// Excluir usuário
function deleteUser(id) {
  if (confirm("Tem certeza que deseja excluir este usuário?")) {
    const allUsuarios = dataManager.getUsuarios();
    const novasUsuarios = allUsuarios.filter(u => u.id !== id);
    dataManager.setUsuarios(novasUsuarios);
    loadUsers();
    alert("Usuário excluído com sucesso!");
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

// Inicializar
loadUsers();
