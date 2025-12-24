document.addEventListener("DOMContentLoaded", async () => {
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

  // Carregar dados da API
  async function loadData() {
    try {
      // Carregar turmas
      const turmasResponse = await fetch("http://localhost:8080/api/classes");
      if (turmasResponse.ok) {
        turmas = await turmasResponse.json();
      }
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
    }
  }

  relatorioBtn.addEventListener("click", async () => {
    relatorioModal.style.display = "flex";
    alunosContainer.style.display = "none";
    materiasContainer.style.display = "none";
    turmasContainer.style.display = "block";
    await preencherTurmas();
  });

  closeRelatorioModal.addEventListener("click", () => {
    relatorioModal.style.display = "none";
  });

  async function preencherTurmas() {
    turmasList.innerHTML = "";
    if (turmas.length === 0) {
      turmasList.innerHTML = "<li>Nenhuma turma encontrada</li>";
      return;
    }
    turmas.forEach((turma) => {
      const li = document.createElement("li");
      li.textContent = turma.name;
      li.addEventListener("click", () => exibirAlunos(turma));
      turmasList.appendChild(li);
    });
  }

  async function exibirAlunos(turma) {
    materiasContainer.style.display = "none";
    alunosContainer.style.display = "block";
    turmasContainer.style.display = "none";
    alunosList.innerHTML = "";
    
    try {
      // Carregar alunos da turma
      const response = await fetch(`http://localhost:8080/api/students/turma/${turma.id}`);
      if (response.ok) {
        const alunos = await response.json();
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
    } catch (error) {
      console.error("Erro ao carregar alunos:", error);
      alunosList.innerHTML = "<li style='color: red;'>Erro ao carregar alunos</li>";
    }
  }

  async function exibirMaterias(aluno) {
    materiasContainer.style.display = "block";
    alunosContainer.style.display = "none";
    materiasList.innerHTML = "";
    
    try {
      // Carregar notas do aluno
      const response = await fetch(`http://localhost:8080/api/grades/student/${aluno.id}`);
      if (response.ok) {
        const grades = await response.json();
        
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
    } catch (error) {
      console.error("Erro ao carregar notas:", error);
      materiasList.innerHTML = "<li style='color: red;'>Erro ao carregar notas</li>";
    }
  }

  function calcularMedia(notas) {
    const soma = notas.reduce((total, nota) => total + nota, 0);
    return (soma / notas.length).toFixed(2);
  }

  // Inicializar
  await loadData();
});
