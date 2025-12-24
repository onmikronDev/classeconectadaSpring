document.addEventListener("DOMContentLoaded", async () => {
  const turmaList = document.getElementById("turmaList");
  const alunosList = document.getElementById("alunosList");

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

  // Carregar turmas da API
  async function loadTurmas() {
    try {
      const response = await fetch("http://localhost:8080/api/classes");
      if (response.ok) {
        turmas = await response.json();
        renderTurmas();
      } else {
        console.error("Erro ao carregar turmas");
        turmaList.innerHTML = "<li style='color: red;'>Erro ao carregar turmas do servidor</li>";
      }
    } catch (error) {
      console.error("Erro ao conectar com o servidor:", error);
      turmaList.innerHTML = "<li style='color: red;'>Erro ao conectar com o servidor. Verifique se o backend está rodando.</li>";
    }
  }

  // Carregar matérias da API
  async function loadSubjects() {
    try {
      const response = await fetch("http://localhost:8080/api/subjects");
      if (response.ok) {
        subjects = await response.json();
        // Atualizar o select de matérias
        materiaNotaInput.innerHTML = '<option value="" disabled selected>Selecione uma matéria</option>';
        subjects.forEach(subject => {
          const option = document.createElement("option");
          option.value = subject.id;
          option.textContent = subject.nome;
          materiaNotaInput.appendChild(option);
        });
      }
    } catch (error) {
      console.error("Erro ao carregar matérias:", error);
    }
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
      li.textContent = turma.name;
      li.addEventListener("click", () => selecionarTurma(li, turma));
      turmaList.appendChild(li);
    });
  }

  /**
   * Preenche a lista de alunos de acordo com a turma selecionada
   * @param {Object} turma Turma selecionada
   */
  async function carregarAlunos(turma) {
    try {
      const response = await fetch(`http://localhost:8080/api/students/turma/${turma.id}`);
      if (response.ok) {
        alunos = await response.json();
        renderAlunos();
      } else {
        console.error("Erro ao carregar alunos");
        alunosList.innerHTML = "<li style='color: red;'>Erro ao carregar alunos</li>";
      }
    } catch (error) {
      console.error("Erro ao conectar com o servidor:", error);
      alunosList.innerHTML = "<li style='color: red;'>Erro ao conectar com o servidor</li>";
    }
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
  }

  function selecionarAluno(li, aluno) {
    if (alunoSelecionado) alunoSelecionado.element.classList.remove("selected");
    alunoSelecionado = { element: li, data: aluno };
    alunoSelecionado.element.classList.add("selected");
  }

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

  notaForm.addEventListener("submit", async (e) => {
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

    // Preparar dados para enviar à API
    const gradeData = {
      student: { id: alunoSelecionado.data.id },
      subject: { id: parseInt(subjectId) },
      value: parseFloat(nota),
      description: descricao,
      examDate: new Date().toISOString().split('T')[0]
    };

    try {
      const response = await fetch("http://localhost:8080/api/grades", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(gradeData),
      });

      if (response.ok) {
        alert("Nota aplicada com sucesso!");
        notaModal.style.display = "none";
        notaForm.reset();
      } else {
        alert("Erro ao aplicar nota. Verifique os dados e tente novamente.");
      }
    } catch (error) {
      console.error("Erro ao aplicar nota:", error);
      alert("Erro ao conectar com o servidor.");
    }
  });

  document.getElementById("voltarBtn").addEventListener("click", () => {
    window.location.href = "index.html";
  });

  // Inicializar
  await loadTurmas();
  await loadSubjects();
});
