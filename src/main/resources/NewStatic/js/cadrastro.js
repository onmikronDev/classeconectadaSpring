document.addEventListener("DOMContentLoaded", () => {
  const tabButtons = document.querySelectorAll(".tab-button");
  const professorFields = document.getElementById("professorFields");
  const alunoFields = document.getElementById("alunoFields");
  const diretorFields = document.getElementById("diretorFields");
  const form = document.getElementById("cadastroForm");

  // Carregar turmas
  carregarTurmas();

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

  // Carregar turmas dinamicamente
  function carregarTurmas() {
    const turmas = MockData.classes.filter(c => c.active);
    
    // Preencher select de turma para professor
    const selectProfessor = document.getElementById('turma');
    selectProfessor.innerHTML = '<option value="">Selecione uma turma</option>';
    turmas.forEach(turma => {
      const option = document.createElement('option');
      option.value = turma.id;
      option.textContent = turma.name;
      selectProfessor.appendChild(option);
    });

    // Preencher select de turma para aluno
    const selectAluno = document.getElementById('turmaAluno');
    selectAluno.innerHTML = '<option value="">Selecione uma turma</option>';
    turmas.forEach(turma => {
      const option = document.createElement('option');
      option.value = turma.id;
      option.textContent = turma.name;
      selectAluno.appendChild(option);
    });
  }

  // Validação de CPF
  function validarCPF(cpf) {
    cpf = cpf.replace(/[^\d]/g, '');
    if (cpf.length !== 11) return false;
    
    // Validação completa com verificação de dígitos verificadores
    let soma = 0;
    let resto;
    
    if (cpf === "00000000000") return false;
    
    for (let i = 1; i <= 9; i++) {
      soma += parseInt(cpf.substring(i-1, i)) * (11 - i);
    }
    resto = (soma * 10) % 11;
    
    if ((resto === 10) || (resto === 11)) resto = 0;
    if (resto !== parseInt(cpf.substring(9, 10))) return false;
    
    soma = 0;
    for (let i = 1; i <= 10; i++) {
      soma += parseInt(cpf.substring(i-1, i)) * (12 - i);
    }
    resto = (soma * 10) % 11;
    
    if ((resto === 10) || (resto === 11)) resto = 0;
    if (resto !== parseInt(cpf.substring(10, 11))) return false;
    
    return true;
  }

  // Submissão do formulário
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const activeTab = document.querySelector(".tab-button.active").getAttribute("data-tab");
    const formData = new FormData(form);

    // Validação de CPF
    const cpf = formData.get("cpf");
    if (!validarCPF(cpf)) {
      alert("CPF inválido!");
      return;
    }

    // Validação de email
    const email = formData.get("email");
    if (!email.includes('@')) {
      alert("Email inválido!");
      return;
    }

    // Preparar dados para salvar
    const turmaId = activeTab === "aluno" ? 
      parseInt(formData.get("turmaAluno")) : 
      (activeTab === "professor" ? parseInt(formData.get("turma")) : null);

    const turma = turmaId ? MockData.classes.find(c => c.id === turmaId) : null;

    const userData = {
      id: MockData.getNextId('users'),
      nome: formData.get("nomeCompleto"),
      email: email,
      senha: "123456", // Senha padrão
      cpf: cpf,
      telefone: formData.get("telefone"),
      tipo: activeTab.toUpperCase(),
      endereco: formData.get("endereco"),
      pai: formData.get("pai") || "",
      mae: formData.get("mae") || "",
      turmaId: turmaId,
      turma: turma ? { id: turma.id, name: turma.name } : null,
      active: true
    };

    // Adicionar usuário
    MockData.users.push(userData);
    saveToLocalStorage();

    alert(`${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} cadastrado com sucesso!`);
    form.reset();
    // Resetar para aba professor
    tabButtons[0].click();
  });
});
