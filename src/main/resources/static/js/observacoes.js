document.addEventListener("DOMContentLoaded", () => {
  const materiasList = document.getElementById("materiasList");
  const notasList = document.getElementById("notasList");

  // Dados fictícios de Alice
  const materias = ["Matemática", "Português", "Ciências", "Geografia", "História"];
  const notas = [
    { materia: "Matemática", nota: 8 },
    { materia: "Português", nota: 7 },
    { materia: "Ciências", nota: 10 },
    { materia: "Geografia", nota: 6 },
    { materia: "História", nota: 9 },
  ];

  // Preencher lista de matérias
  materias.forEach((materia) => {
    const li = document.createElement("li");
    li.textContent = materia;
    materiasList.appendChild(li);
  });

  // Preencher lista de notas
  notas.forEach(({ materia, nota }) => {
    const li = document.createElement("li");
    li.textContent = `${materia}: ${nota}`;
    li.addEventListener("click", () => selecionarNota(li, materia, nota));
    notasList.appendChild(li);
  });

  let notaSelecionada = null;

  // Seleciona uma nota
  function selecionarNota(li, materia, nota) {
    if (notaSelecionada) notaSelecionada.classList.remove("selected");
    notaSelecionada = li;
    notaSelecionada.classList.add("selected");
    alert(`Nota Selecionada:\nMatéria: ${materia}\nNota: ${nota}`);
  }

  // Botão Editar
  document.getElementById("editarBtn").addEventListener("click", () => {
    if (notaSelecionada) {
      alert(`Editando nota de:\n${notaSelecionada.textContent}`);
    } else {
      alert("Selecione uma nota para editar.");
    }
  });

  // Botão Deletar
  document.getElementById("deletarBtn").addEventListener("click", () => {
    if (notaSelecionada) {
      alert(`Deletando nota de:\n${notaSelecionada.textContent}`);
      notasList.removeChild(notaSelecionada);
      notaSelecionada = null;
    } else {
      alert("Selecione uma nota para deletar.");
    }
  });

  // Botão Voltar
  document.getElementById("voltarBtn").addEventListener("click", () => {
    window.location.href = "turma.html";
  });
});11
