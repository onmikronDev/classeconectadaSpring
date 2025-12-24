document.addEventListener("DOMContentLoaded", async () => {
  const materiasList = document.getElementById("materiasList");
  const notasList = document.getElementById("notasList");

  // Obter dados do usuário logado do localStorage
  const userStr = localStorage.getItem("user");
  if (!userStr) {
    alert("Usuário não autenticado. Redirecionando para login.");
    window.location.href = "Login.html";
    return;
  }

  const user = JSON.parse(userStr);
  const studentId = user.id;

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

  // Load and display attendance statistics
  try {
    const statsResponse = await fetch(`http://localhost:8080/api/attendances/student/${studentId}/stats`);
    if (statsResponse.ok) {
      const stats = await statsResponse.json();
      const statsLi = document.createElement("li");
      statsLi.style.backgroundColor = '#2E6264';
      statsLi.style.borderLeft = '4px solid #58D68D';
      statsLi.style.fontWeight = 'bold';
      statsLi.innerHTML = `
        <div style="padding: 10px;">
          <div>📊 Estatísticas de Presença</div>
          <div style="margin-top: 5px;">✅ Presenças: ${stats.present}</div>
          <div>❌ Faltas: ${stats.absent}</div>
          <div>📝 Justificadas: ${stats.justified}</div>
        </div>
      `;
      materiasList.appendChild(statsLi);
    }
  } catch (error) {
    console.error("Erro ao carregar estatísticas de presença:", error);
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
