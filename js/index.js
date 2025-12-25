document.addEventListener("DOMContentLoaded", () => {
  const relatorioBtn = document.getElementById("relatorioBtn");
  const relatorioModal = document.getElementById("relatorioModal");
  const closeRelatorioModal = document.getElementById("closeRelatorioModal");
  const turmasList = document.getElementById("turmasList");
  const alunosList = document.getElementById("alunosList");
  const materiasList = document.getElementById("materiasList");
  const turmasContainer = document.getElementById("turmasContainer");
  const alunosContainer = document.getElementById("alunosContainer");
  const materiasContainer = document.getElementById("materiasContainer");

  let turmas = [];
  let alunosSelecionados = [];
  let notasDoAluno = [];

  relatorioBtn.addEventListener("click", () => {
    relatorioModal.style.display = "flex";
    alunosContainer.style.display = "none";
    materiasContainer.style.display = "none";
    turmasContainer.style.display = "block";
    carregarTurmas();
  });

  closeRelatorioModal.addEventListener("click", () => {
    relatorioModal.style.display = "none";
  });

  /**
   * Carregar turmas do MockData
   */
  function carregarTurmas() {
    turmas = MockData.classes.filter(c => c.active);
    preencherTurmas();
  }

  function preencherTurmas() {
    turmasList.innerHTML = "";
    turmas.forEach((turma) => {
      const li = document.createElement("li");
      li.textContent = turma.name;
      li.addEventListener("click", () => exibirAlunos(turma));
      turmasList.appendChild(li);
    });
  }

  /**
   * Carregar alunos da turma selecionada
   */
  function exibirAlunos(turma) {
    alunosSelecionados = MockData.users.filter(u => 
      u.tipo === "ALUNO" && u.turmaId === turma.id && u.active
    );
    
    materiasContainer.style.display = "none";
    alunosContainer.style.display = "block";
    turmasContainer.style.display = "none";
    
    alunosList.innerHTML = "";
    alunosSelecionados.forEach((aluno) => {
      const li = document.createElement("li");
      li.textContent = aluno.nome;
      li.addEventListener("click", () => exibirMaterias(aluno));
      alunosList.appendChild(li);
    });
  }

  /**
   * Carregar notas do aluno e calcular médias por matéria
   */
  function exibirMaterias(aluno) {
    notasDoAluno = MockData.grades.filter(g => g.studentId === aluno.id);
    
    // Organizar notas por matéria e calcular médias
    const notasPorMateria = {};
    notasDoAluno.forEach(nota => {
      const materiaNome = nota.subject.name;
      if (!notasPorMateria[materiaNome]) {
        notasPorMateria[materiaNome] = [];
      }
      notasPorMateria[materiaNome].push(nota.value);
    });

    materiasContainer.style.display = "block";
    alunosContainer.style.display = "none";
    
    materiasList.innerHTML = "";
    Object.entries(notasPorMateria).forEach(([materia, notas]) => {
      const media = calcularMedia(notas);
      const li = document.createElement("li");
      li.textContent = `${materia}: Média ${media}`;
      materiasList.appendChild(li);
    });

    // Se não houver notas
    if (Object.keys(notasPorMateria).length === 0) {
      materiasList.innerHTML = "<li>Nenhuma nota registrada</li>";
    }
  }

  function calcularMedia(notas) {
    if (notas.length === 0) return "0.00";
    const soma = notas.reduce((total, nota) => total + nota, 0);
    return (soma / notas.length).toFixed(2);
  }
});
