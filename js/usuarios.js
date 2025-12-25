// API Base URL
const API_URL = "../api/users.php";

// Dados de usuários (serão carregados da API)
let usuarios = [];

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

// Carregar usuários da API
async function loadUsers() {
  try {
    const response = await fetch(API_URL);
    if (response.ok) {
      usuarios = await response.json();
      // Mapear tipo para lowercase para compatibilidade com o frontend
      usuarios = usuarios.map(user => ({
        ...user,
        tipo: user.tipo.toLowerCase()
      }));
      renderTable();
    } else {
      console.error("Erro ao carregar usuários");
      tableBody.innerHTML = `<tr><td colspan="6" style="text-align: center; color: red;">Erro ao carregar usuários do servidor</td></tr>`;
    }
  } catch (error) {
    console.error("Erro ao conectar com o servidor:", error);
    tableBody.innerHTML = `<tr><td colspan="6" style="text-align: center; color: red;">Erro ao conectar com o servidor. Verifique se o backend está rodando.</td></tr>`;
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

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUser),
      });

      if (response.ok) {
        await loadUsers();
        closeModal();
        alert("Usuário atualizado com sucesso!");
      } else {
        alert("Erro ao atualizar usuário.");
      }
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
      alert("Erro ao conectar com o servidor.");
    }
  }
});

// Excluir usuário
async function deleteUser(id) {
  if (confirm("Tem certeza que deseja excluir este usuário?")) {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      if (response.ok || response.status === 204) {
        await loadUsers();
        alert("Usuário excluído com sucesso!");
      } else {
        alert("Erro ao excluir usuário.");
      }
    } catch (error) {
      console.error("Erro ao excluir usuário:", error);
      alert("Erro ao conectar com o servidor.");
    }
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
