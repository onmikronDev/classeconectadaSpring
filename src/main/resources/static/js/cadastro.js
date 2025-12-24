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
      tipo: tipo,
      active: true
    };

    try {
      const response = await fetch("http://localhost:8080/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        const savedUser = await response.json();
        console.log(`${activeTab} cadastrado:`, savedUser);
        alert(`${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} cadastrado com sucesso!`);
        form.reset();
      } else {
        const error = await response.text();
        console.error("Erro ao cadastrar:", error);
        alert("Erro ao cadastrar usuário. Verifique os dados e tente novamente.");
      }
    } catch (error) {
      console.error("Erro ao conectar com o servidor:", error);
      alert("Erro ao conectar com o servidor. Verifique se o backend está rodando.");
    }
  });
});
