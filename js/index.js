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
  let alunosPorTurma = {};
  let notasPorAluno = {};

  // Carregar dados do localStorage
  function loadData() {
    turmas = dataManager.getTurmas();
  }

  relatorioBtn.addEventListener("click", () => {
    relatorioModal.style.display = "flex";
    alunosContainer.style.display = "none";
    materiasContainer.style.display = "none";
    turmasContainer.style.display = "block";
    preencherTurmas();
  });

  closeRelatorioModal.addEventListener("click", () => {
    relatorioModal.style.display = "none";
  });

  function preencherTurmas() {
    turmasList.innerHTML = "";
    if (turmas.length === 0) {
      turmasList.innerHTML = "<li>Nenhuma turma encontrada</li>";
      return;
    }
    turmas.forEach((turma) => {
      const li = document.createElement("li");
      li.textContent = turma.nome;
      li.addEventListener("click", () => exibirAlunos(turma));
      turmasList.appendChild(li);
    });
  }

  function exibirAlunos(turma) {
    materiasContainer.style.display = "none";
    alunosContainer.style.display = "block";
    turmasContainer.style.display = "none";
    alunosList.innerHTML = "";
    
    // Carregar alunos da turma do localStorage
    const alunos = dataManager.getAlunosPorTurma(turma.id);
    
    if (alunos.length === 0) {
      alunosList.innerHTML = "<li>Nenhum aluno encontrado nesta turma</li>";
      return;
    }
    
    alunos.forEach((aluno) => {
      const li = document.createElement("li");
      li.textContent = aluno.nome;
      li.addEventListener("click", () => exibirMaterias(aluno));
      alunosList.appendChild(li);
    });
  }

  function exibirMaterias(aluno) {
    materiasContainer.style.display = "block";
    alunosContainer.style.display = "none";
    materiasList.innerHTML = "";
    
    // Carregar notas do aluno do localStorage
    const grades = dataManager.getNotasPorAluno(aluno.id);
    
    if (grades.length === 0) {
      materiasList.innerHTML = "<li>Nenhuma nota encontrada para este aluno</li>";
      return;
    }
    
    // Agrupar notas por matéria e calcular média
    const notasPorMateria = {};
    grades.forEach(grade => {
      const materia = grade.subject?.nome || "Sem matéria";
      if (!notasPorMateria[materia]) {
        notasPorMateria[materia] = [];
      }
      notasPorMateria[materia].push(grade.value);
    });
    
    Object.entries(notasPorMateria).forEach(([materia, notas]) => {
      const media = calcularMedia(notas);
      const li = document.createElement("li");
      li.textContent = `${materia}: Média ${media}`;
      materiasList.appendChild(li);
    });
  }

  function calcularMedia(notas) {
    const soma = notas.reduce((total, nota) => total + nota, 0);
    return (soma / notas.length).toFixed(2);
  }

  // Inicializar
  loadData();
});
