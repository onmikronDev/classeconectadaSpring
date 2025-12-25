document.addEventListener("DOMContentLoaded", () => {
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

  let turmaSelecionada = null; // Elemento de turma selecionada
  let turmaIdSelecionada = null; // ID da turma selecionada
  let alunoSelecionado = null; // Elemento de aluno selecionado
  let alunoIdSelecionado = null; // ID do aluno selecionado

  // Carregar turmas e matérias
  carregarTurmas();
  carregarMaterias();

  /**
   * Carregar turmas do MockData
   */
  function carregarTurmas() {
    const turmas = MockData.classes.filter(c => c.active);
    
    turmaList.innerHTML = "";
    turmas.forEach((turma) => {
      const li = document.createElement("li");
      li.textContent = turma.name;
      li.dataset.turmaId = turma.id;
      li.addEventListener("click", () => selecionarTurma(li, turma.id));
      turmaList.appendChild(li);
    });
  }

  /**
   * Carregar matérias do MockData para o select
   */
  function carregarMaterias() {
    const materias = MockData.subjects.filter(s => s.active);
    
    materiaNotaInput.innerHTML = '<option value="" disabled selected>Selecione uma matéria</option>';
    materias.forEach(materia => {
      const option = document.createElement('option');
      option.value = materia.id;
      option.textContent = materia.name;
      materiaNotaInput.appendChild(option);
    });
  }

  /**
   * Carregar alunos da turma selecionada
   */
  function carregarAlunos(turmaId) {
    const alunos = MockData.users.filter(u => 
      u.tipo === "ALUNO" && u.turmaId === turmaId && u.active
    );
    
    alunosList.innerHTML = "";
    alunos.forEach((aluno) => {
      const li = document.createElement("li");
      li.innerHTML = `<span>${aluno.nome}</span>`;
      li.dataset.alunoId = aluno.id;
      li.dataset.alunoNome = aluno.nome;
      li.addEventListener("click", () => selecionarAluno(li, aluno.id, aluno.nome));
      alunosList.appendChild(li);
    });
  }

  function selecionarTurma(li, turmaId) {
    if (turmaSelecionada) turmaSelecionada.classList.remove("selected");
    turmaSelecionada = li;
    turmaSelecionada.classList.add("selected");
    turmaIdSelecionada = turmaId;
    
    // Carregar alunos
    carregarAlunos(turmaId);
  }

  function selecionarAluno(li, alunoId, alunoNome) {
    if (alunoSelecionado) alunoSelecionado.classList.remove("selected");
    alunoSelecionado = li;
    alunoSelecionado.classList.add("selected");
    alunoIdSelecionado = alunoId;
  }

  document.getElementById("notasBtn").addEventListener("click", () => {
    if (alunoSelecionado && turmaSelecionada) {
      alunoNotaInput.value = alunoSelecionado.dataset.alunoNome;
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

  // Enviar nota
  notaForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const materiaId = parseInt(materiaNotaInput.value);
    const descricao = descricaoNotaInput.value;
    const nota = parseFloat(valorNotaInput.value);

    if (!materiaId) {
      alert("Por favor, selecione uma matéria.");
      return;
    }

    // Validação de nota
    if (nota < 0 || nota > 10) {
      alert("Nota deve estar entre 0 e 10.");
      return;
    }

    // Encontrar o objeto da matéria
    const subject = MockData.subjects.find(s => s.id === materiaId);

    // Criar nova nota
    const newGrade = {
      id: MockData.getNextId('grades'),
      studentId: alunoIdSelecionado,
      subjectId: materiaId,
      subject: { id: subject.id, name: subject.name },
      value: nota,
      description: descricao,
      examDate: new Date().toISOString().split('T')[0]
    };

    MockData.grades.push(newGrade);
    saveToLocalStorage();

    alert(`Nota enviada com sucesso!`);
    notaModal.style.display = "none";
  });

  // Atualizar botão histórico para passar studentId
  document.getElementById("historicoBtn").addEventListener("click", (e) => {
    e.preventDefault();
    if (alunoIdSelecionado) {
      window.location.href = `historico.html?studentId=${alunoIdSelecionado}`;
    } else {
      alert("Selecione um aluno para ver o histórico.");
    }
  });

  document.getElementById("voltarBtn").addEventListener("click", () => {
    window.location.href = "index.html";
  });
});
