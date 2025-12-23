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

  const dados = {
    "Turma A": [
      {
        nome: "Alice",
        materias: {
          Matemática: [8, 9],
          Português: [7, 10],
          Ciências: [10, 8],
          Geografia: [6, 7],
          História: [9, 10],
        },
      },
    ],
    "Turma B": [
      {
        nome: "João",
        materias: {
          Matemática: [6, 5],
          Português: [7, 6],
          Ciências: [8, 7],
          Geografia: [9, 8],
          História: [6, 7],
        },
      },
    ],
  };

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
    Object.keys(dados).forEach((turma) => {
      const li = document.createElement("li");
      li.textContent = turma;
      li.addEventListener("click", () => exibirAlunos(turma));
      turmasList.appendChild(li);
    });
  }

  function exibirAlunos(turma) {
    materiasContainer.style.display = "none";
    alunosContainer.style.display = "block";
    turmasContainer.style.display = "none";
    alunosList.innerHTML = "";
    const alunos = dados[turma];
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
    Object.entries(aluno.materias).forEach(([materia, notas]) => {
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
});
