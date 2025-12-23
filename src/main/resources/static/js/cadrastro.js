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
        diretorFields. style.display = "block";
      }
    });
  });

  // Submissão do formulário
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const activeTab = document.querySelector(".tab-button.active").getAttribute("data-tab");
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    console.log(`Cadastrando ${activeTab}: `, data);
    alert(`${activeTab. charAt(0).toUpperCase() + activeTab.slice(1)} cadastrado com sucesso!`);
    form.reset();
  });
});
