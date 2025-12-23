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

  // Modal de Aplicar Observação
  const observacaoModal = document.getElementById("observacaoModal");
  const closeObservacaoModal = document.getElementById("closeObservacaoModal");
  const alunoObservacaoInput = document.getElementById("alunoObservacao");
  const turmaObservacaoInput = document.getElementById("turmaObservacao");
  const observacaoInput = document.getElementById("observacao");
  const observacaoForm = document.getElementById("observacaoForm");

  let turmaSelecionada = null; // Turma selecionada
  let alunoSelecionado = null; // Aluno selecionado

  // Dados simulados
  const turmas = ["Turma A", "Turma B", "Turma C"];
  const alunosPorTurma = {
    "Turma A": ["Alice", "Lucas", "Maria"],
    "Turma B": ["João", "Ana", "Pedro"],
    "Turma C": ["Marina", "Rafael", "Carla"],
  };

  /**
   * Preenchendo lista de turmas na UI
   */
  turmas.forEach((turma) => {
    const li = document.createElement("li");
    li.textContent = turma;
    li.addEventListener("click", () => selecionarTurma(li, turma));
    turmaList.appendChild(li);
  });

  /**
   * Preenche a lista de alunos de acordo com a turma selecionada
   * @param {string} turma Turma selecionada
   */
  function carregarAlunos(turma) {
    alunosList.innerHTML = "";
    const alunos = alunosPorTurma[turma];
    alunos.forEach((aluno) => {
      const li = document.createElement("li");
      li.innerHTML = `
                <span>${aluno}</span>
                <div class="presence-options">
                    <button class="present">Presente</button>
                    <button class="absent">Falta</button>
                    <button class="justified">Justificada</button>
                </div>
            `;

      li.addEventListener("click", () => selecionarAluno(li, aluno));

      const span = li.querySelector("span");
      li.querySelector(".present").addEventListener("click", () => {
        span.style.color = "#58D68D";
      });
      li.querySelector(".absent").addEventListener("click", () => {
        span.style.color = "#E74C3C";
      });
      li.querySelector(".justified").addEventListener("click", () => {
        span.style.color = "#F1C40F";
      });

      alunosList.appendChild(li);
    });
  }

  function selecionarTurma(li, turma) {
    if (turmaSelecionada) turmaSelecionada.classList.remove("selected");
    turmaSelecionada = li;
    turmaSelecionada.classList.add("selected");
    carregarAlunos(turma);
  }

  function selecionarAluno(li, aluno) {
    if (alunoSelecionado) alunoSelecionado.classList.remove("selected");
    alunoSelecionado = li;
    alunoSelecionado.classList.add("selected");
  }

  document.getElementById("notasBtn").addEventListener("click", () => {
    if (alunoSelecionado && turmaSelecionada) {
      alunoNotaInput.value = alunoSelecionado.querySelector("span").textContent;
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
    const aluno = alunoNotaInput.value;
    const materia = materiaNotaInput.value;
    const descricao = descricaoNotaInput.value;
    const nota = valorNotaInput.value;

    if (!materia) {
      alert("Por favor, selecione uma matéria.");
      return;
    }

    alert(`Nota enviada:\nAluno: ${aluno}\nMatéria: ${materia}\nDescrição: ${descricao}\nNota: ${nota}`);
    notaModal.style.display = "none";
  });

  document.getElementById("observacoesBtn").addEventListener("click", () => {
    if (alunoSelecionado && turmaSelecionada) {
      alunoObservacaoInput.value = alunoSelecionado.querySelector("span").textContent;
      turmaObservacaoInput.value = turmaSelecionada.textContent;
      observacaoInput.value = "";
      observacaoModal.style.display = "flex";
    } else {
      alert("Selecione uma turma e um aluno antes de aplicar uma observação.");
    }
  });

  closeObservacaoModal.addEventListener("click", () => {
    observacaoModal.style.display = "none";
  });

  observacaoForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const aluno = alunoObservacaoInput.value;
    const turma = turmaObservacaoInput.value;
    const observacao = observacaoInput.value;

    alert(`Observação enviada:\nAluno: ${aluno}\nTurma: ${turma}\nObservação: ${observacao}`);
    observacaoModal.style.display = "none";
  });

  document.getElementById("voltarBtn").addEventListener("click", () => {
    window.location.href = "index.html";
  });
});
