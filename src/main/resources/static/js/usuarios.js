// Dados mockados (simulação de banco de dados)
let usuarios = [
  { id:  1, nome: "João Silva", tipo: "professor", email: "joao@email.com", telefone: "(11) 98765-4321", turma: "Turma A", materia: "Matemática" },
  { id: 2, nome: "Maria Santos", tipo: "aluno", email: "maria@email.com", telefone: "(11) 98765-1234", turma: "Turma B", materia: "" },
  { id: 3, nome: "Carlos Oliveira", tipo: "diretor", email: "carlos@email.com", telefone: "(11) 98765-5678", turma: "", materia: "" },
  { id: 4, nome: "Ana Costa", tipo: "professor", email: "ana@email. com", telefone: "(11) 98765-8765", turma: "Turma C", materia: "Português" },
  { id: 5, nome: "Pedro Lima", tipo: "aluno", email: "pedro@email.com", telefone: "(11) 98765-4444", turma: "Turma A", materia: "" },
];

let currentEditId = null;

// Elementos do DOM
const tableBody = document.getElementById("usuariosTableBody");
const filterTipo = document.getElementById("filterTipo");
const searchNome = document.getElementById("searchNome");
const editModal = document.getElementById("editModal");
const closeEditModal = document.getElementById("closeEditModal");
const cancelEdit = document.getElementById("cancelEdit");
const editForm = document. getElementById("editForm");
const editTipo = document.getElementById("editTipo");
const editTurmaGroup = document.getElementById("editTurmaGroup");
const editMateriaGroup = document.getElementById("editMateriaGroup");

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
      <td>${user. email}</td>
      <td>${user.telefone}</td>
      <td>${user.tipo === "professor" ? `${user.turma} - ${user.materia}` : user.tipo === "aluno" ? user. turma : "N/A"}</td>
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
  if (! user) return;

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
  editMateriaGroup.style. display = tipo === "professor" ?  "flex" : "none";
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
  const user = usuarios.find(u => u.id === id);

  if (user) {
    user.nome = document.getElementById("editNome").value;
    user.email = document.getElementById("editEmail").value;
    user.telefone = document.getElementById("editTelefone").value;
    user.tipo = document.getElementById("editTipo").value;
    user.turma = document.getElementById("editTurma").value;
    user.materia = document.getElementById("editMateria").value;

    renderTable();
    closeModal();
    alert("Usuário atualizado com sucesso!");
  }
});

// Excluir usuário
function deleteUser(id) {
  if (confirm("Tem certeza que deseja excluir este usuário? ")) {
    usuarios = usuarios. filter(u => u.id !== id);
    renderTable();
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
window. addEventListener("click", (e) => {
  if (e.target === editModal) {
    closeModal();
  }
});

// Inicializar
renderTable();
