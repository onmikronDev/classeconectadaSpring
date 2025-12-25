document.addEventListener("DOMContentLoaded", () => {
  const materiasList = document.getElementById("materiasList");
  const notasList = document.getElementById("notasList");
  const pageTitle = document.getElementById("pageTitle");

  // Obter dados do usuário logado do localStorage
  const userStr = localStorage.getItem("user");
  if (!userStr) {
    alert("Usuário não autenticado. Redirecionando para login.");
    window.location.href = "Login.html";
    return;
  }

  const user = JSON.parse(userStr);
  const studentId = user.id;
  
  // Atualizar título da página com o nome do usuário
  if (pageTitle) {
    pageTitle.textContent = `Histórico de ${user.nome}`;
  }

  // Buscar notas do aluno do localStorage
  let notasPorMateria = {};

  const grades = dataManager.getNotasPorAluno(studentId);
  
  // Agrupar notas por matéria
  grades.forEach(grade => {
    const materia = grade.subject?.nome || "Sem matéria";
    if (!notasPorMateria[materia]) {
      notasPorMateria[materia] = [];
    }
    notasPorMateria[materia].push({
      valor: grade.value,
      descricao: grade.description,
      data: grade.examDate
    });
  });

  // Preencher lista de matérias
  Object.keys(notasPorMateria).forEach((materia) => {
    const li = document.createElement("li");
    li.textContent = materia;
    li.addEventListener("click", () => filtrarNotasPorMateria(materia));
    materiasList.appendChild(li);
  });
  
  // Mostrar mensagem se não houver notas
  if (Object.keys(notasPorMateria).length === 0) {
    materiasList.innerHTML = "<li style='color: #888;'>Nenhuma matéria com notas</li>";
    notasList.innerHTML = "<li style='color: #888;'>Nenhuma nota registrada</li>";
  }

  /**
   * Filtra as notas com base na matéria selecionada
   * @param {string} materia Nome da matéria
   */
  function filtrarNotasPorMateria(materia) {
    notasList.innerHTML = ""; // Limpa as notas atuais
    notasPorMateria[materia].forEach((nota) => {
      const li = document.createElement("li");
      li.textContent = `Nota: ${nota.valor} - ${nota.descricao || "Sem descrição"} (${nota.data || "Sem data"})`;
      notasList.appendChild(li);
    });
  }

  // Inicialmente mostra todas as notas
  Object.entries(notasPorMateria).forEach(([materia, notas]) => {
    notas.forEach((nota) => {
      const li = document.createElement("li");
      li.textContent = `${materia}: Nota ${nota.valor} - ${nota.descricao || "Sem descrição"}`;
      notasList.appendChild(li);
    });
  });

  // Botão Voltar
  document.getElementById("voltarBtn").addEventListener("click", () => {
    window.location.href = "turma.html"; // Exemplo: volta para lista de turmas
  });
});
