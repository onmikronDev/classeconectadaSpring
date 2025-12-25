document.addEventListener("DOMContentLoaded", () => {
  const turmaList = document.getElementById("turmaList");
  const alunosList = document.getElementById("alunosList");
  const historicoBtn = document.getElementById("historicoBtn");

  // Modal de Aplicar Nota
  const notaModal = document.getElementById("notaModal");
  const closeNotaModal = document.getElementById("closeNotaModal");
  const alunoNotaInput = document.getElementById("alunoNota");
  const materiaNotaInput = document.getElementById("materiaNota");
  const descricaoNotaInput = document.getElementById("descricaoNota");
  const valorNotaInput = document.getElementById("valorNota");
  const notaForm = document.getElementById("notaForm");

  let turmaSelecionada = null; // Turma selecionada
  let alunoSelecionado = null; // Aluno selecionado
  let turmas = [];
  let alunos = [];
  let subjects = [];

  // Carregar turmas do localStorage
  function loadTurmas() {
    turmas = dataManager.getTurmas();
    renderTurmas();
  }

  // Carregar matérias do localStorage
  function loadSubjects() {
    subjects = dataManager.getMaterias();
    // Atualizar o select de matérias
    materiaNotaInput.innerHTML = '<option value="" disabled selected>Selecione uma matéria</option>';
    subjects.forEach(subject => {
      const option = document.createElement("option");
      option.value = subject.id;
      option.textContent = subject.nome;
      materiaNotaInput.appendChild(option);
    });
  }

  // Renderizar lista de turmas
  function renderTurmas() {
    turmaList.innerHTML = "";
    if (turmas.length === 0) {
      turmaList.innerHTML = "<li>Nenhuma turma encontrada</li>";
      return;
    }
    turmas.forEach((turma) => {
      const li = document.createElement("li");
      li.textContent = turma.nome;
      li.addEventListener("click", () => selecionarTurma(li, turma));
      turmaList.appendChild(li);
    });
  }

  /**
   * Preenche a lista de alunos de acordo com a turma selecionada
   * @param {Object} turma Turma selecionada
   */
  function carregarAlunos(turma) {
    alunos = dataManager.getAlunosPorTurma(turma.id);
    renderAlunos();
  }

  // Renderizar lista de alunos
  function renderAlunos() {
    alunosList.innerHTML = "";
    if (alunos.length === 0) {
      alunosList.innerHTML = "<li>Nenhum aluno encontrado nesta turma</li>";
      return;
    }
    alunos.forEach((aluno) => {
      const li = document.createElement("li");
      li.innerHTML = `<span>${aluno.nome}</span>`;
      li.addEventListener("click", () => selecionarAluno(li, aluno));
      alunosList.appendChild(li);
    });
  }

  function selecionarTurma(li, turma) {
    if (turmaSelecionada) turmaSelecionada.element.classList.remove("selected");
    turmaSelecionada = { element: li, data: turma };
    turmaSelecionada.element.classList.add("selected");
    carregarAlunos(turma);
    
    // Desabilitar botão de histórico ao mudar de turma
    alunoSelecionado = null;
    historicoBtn.disabled = true;
  }

  function selecionarAluno(li, aluno) {
    if (alunoSelecionado) alunoSelecionado.element.classList.remove("selected");
    alunoSelecionado = { element: li, data: aluno };
    alunoSelecionado.element.classList.add("selected");
    
    // Habilitar botão de histórico quando aluno é selecionado
    historicoBtn.disabled = false;
  }

  // Botão Histórico
  historicoBtn.addEventListener("click", () => {
    if (alunoSelecionado) {
      // Salvar o aluno selecionado no localStorage para a página de histórico
      localStorage.setItem("selectedStudent", JSON.stringify(alunoSelecionado.data));
      window.location.href = "../html/historico.html";
    } else {
      alert("Selecione um aluno para ver o histórico.");
    }
  });

  document.getElementById("notasBtn").addEventListener("click", () => {
    if (alunoSelecionado && turmaSelecionada) {
      alunoNotaInput.value = alunoSelecionado.data.nome;
      materiaNotaInput.value = "";
      descricaoNotaInput.value = "";
      valorNotaInput.value = "";
      notaModal.style.display = "flex";
    } else {
      alert("Selecione uma turma e um aluno antes de aplicar uma nota.");
    }
  });

  closeNotaModal.addEventListener("click", () => {
    notaModal.style.display = "none";
  });

  notaForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const subjectId = materiaNotaInput.value;
    const descricao = descricaoNotaInput.value;
    const nota = valorNotaInput.value;

    if (!subjectId) {
      alert("Por favor, selecione uma matéria.");
      return;
    }

    if (!nota || nota < 0 || nota > 10) {
      alert("Por favor, insira uma nota válida entre 0 e 10.");
      return;
    }

    // Salvar nota no localStorage
    const novaNota = {
      student_id: alunoSelecionado.data.id,
      subject_id: parseInt(subjectId),
      value: parseFloat(nota),
      description: descricao,
      examDate: new Date().toISOString().split('T')[0]
    };

    dataManager.adicionarNota(novaNota);
    
    alert("Nota aplicada com sucesso!");
    notaModal.style.display = "none";
    notaForm.reset();
  });

  document.getElementById("voltarBtn").addEventListener("click", () => {
    window.location.href = "index.html";
  });

  // Inicializar
  loadTurmas();
  loadSubjects();
});
