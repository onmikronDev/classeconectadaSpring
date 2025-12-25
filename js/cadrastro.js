document.addEventListener("DOMContentLoaded", () => {
  const tabButtons = document.querySelectorAll(".tab-button");
  const professorFields = document.getElementById("professorFields");
  const alunoFields = document.getElementById("alunoFields");
  const diretorFields = document.getElementById("diretorFields");
  const form = document.getElementById("cadastroForm");

  // Gerenciar abas
  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Remove ativo de todos
      tabButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      // Esconde todos os campos dinâmicos
      professorFields.style.display = "none";
      alunoFields.style.display = "none";
      diretorFields.style.display = "none";

      // Mostra campos específicos
      const tab = button.getAttribute("data-tab");
      if (tab === "professor") {
        professorFields.style.display = "flex";
      } else if (tab === "aluno") {
        alunoFields.style.display = "flex";
      } else if (tab === "diretor") {
        diretorFields.style.display = "block";
      }
    });
  });

  // Submissão do formulário
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const activeTab = document.querySelector(".tab-button.active").getAttribute("data-tab");
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    // Mapear tipo de usuário
    let tipo;
    if (activeTab === "professor") {
      tipo = "PROFESSOR";
    } else if (activeTab === "aluno") {
      tipo = "ALUNO";
    } else if (activeTab === "diretor") {
      tipo = "DIRETOR";
    }

    // Preparar dados para enviar à API
    const userData = {
      nome: data.nome,
      email: data.email,
      cpf: data.cpf,
      telefone: data.telefone,
      senha: data.senha,
      tipo: tipo.toUpperCase(),
      ativo: 1
    };

    // Adicionar novo usuário ao localStorage
    const usuarios = dataManager.getUsuarios();
    const newId = usuarios.length > 0 ? Math.max(...usuarios.map(u => u.id)) + 1 : 1;
    const novoUsuario = { id: newId, ...userData };
    
    usuarios.push(novoUsuario);
    dataManager.setUsuarios(usuarios);
    
    console.log(`${activeTab} cadastrado:`, novoUsuario);
    alert(`${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} cadastrado com sucesso!`);
    form.reset();
  });
});
