document.addEventListener("DOMContentLoaded", async () => {
  const materiasList = document.getElementById("materiasList");
  const notasList = document.getElementById("notasList");
  const historicoTitle = document.getElementById("historicoTitle");

  // Obter studentId da URL
  const urlParams = new URLSearchParams(window.location.search);
  const studentId = urlParams.get("studentId");

  if (!studentId) {
    alert("Nenhum aluno selecionado. Redirecionando para turmas.");
    window.location.href = "turma.html";
    return;
  }

  // Buscar dados do aluno
  let studentName = "Aluno";
  try {
    const studentResponse = await fetch(`http://localhost:8080/api/students/${studentId}`);
    if (studentResponse.ok) {
      const student = await studentResponse.json();
      studentName = student.nome;
      historicoTitle.textContent = `Histórico de ${studentName}`;
    } else {
      console.error("Erro ao carregar dados do aluno");
      historicoTitle.textContent = `Histórico do Aluno`;
    }
  } catch (error) {
    console.error("Erro ao conectar com o servidor:", error);
    historicoTitle.textContent = `Histórico do Aluno`;
  }

  // Buscar notas do aluno da API
  let notasPorMateria = {};

  try {
    const response = await fetch(`http://localhost:8080/api/grades/student/${studentId}`);
    if (response.ok) {
      const grades = await response.json();
      
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
    } else {
      console.error("Erro ao carregar notas");
      notasList.innerHTML = "<li style='color: red;'>Erro ao carregar notas do servidor</li>";
    }
  } catch (error) {
    console.error("Erro ao conectar com o servidor:", error);
    notasList.innerHTML = "<li style='color: red;'>Erro ao conectar com o servidor. Verifique se o backend está rodando.</li>";
  }

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
