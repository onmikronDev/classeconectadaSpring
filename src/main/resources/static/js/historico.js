document.addEventListener("DOMContentLoaded", () => {
  const materiasList = document.getElementById("materiasList");
  const notasList = document.getElementById("notasList");

  // Dados fictícios de Alice
  const notasPorMateria = {
    Matemática: [8, 9],
    Português: [7, 10],
    Ciências: [10, 8],
    Geografia: [6, 7],
    História: [9, 10],
  };

  // Preencher lista de matérias
  Object.keys(notasPorMateria).forEach((materia) => {
    const li = document.createElement("li");
    li.textContent = materia;
    li.addEventListener("click", () => filtrarNotasPorMateria(materia));
    materiasList.appendChild(li);
  });

  /**
   * Filtra as notas com base na matéria selecionada
   * @param {string} materia Nome da matéria
   */
  function filtrarNotasPorMateria(materia) {
    notasList.innerHTML = ""; // Limpa as notas atuais
    notasPorMateria[materia].forEach((nota) => {
      const li = document.createElement("li");
      li.textContent = `Nota: ${nota}`;
      notasList.appendChild(li);
    });
  }

  // Inicialmente mostra todas as notas
  Object.entries(notasPorMateria).forEach(([materia, notas]) => {
    notas.forEach((nota) => {
      const li = document.createElement("li");
      li.textContent = `${materia}: Nota ${nota}`;
      notasList.appendChild(li);
    });
  });

  // Botão Voltar
  document.getElementById("voltarBtn").addEventListener("click", () => {
    window.location.href = "turma.html"; // Exemplo: volta para lista de turmas
  });
});
