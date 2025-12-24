document.addEventListener("DOMContentLoaded", async () => {
  const materiasList = document.getElementById("materiasList");
  const notasList = document.getElementById("notasList");
  const frequenciaList = document.getElementById("frequenciaList");

  // Get colors from CSS variables once
  const styles = getComputedStyle(document.body);
  const ATTENDANCE_COLORS = {
    PRESENTE: styles.getPropertyValue('--color-presente')?.trim() || '#58D68D',
    FALTA: styles.getPropertyValue('--color-falta')?.trim() || '#E74C3C',
    JUSTIFICADA: styles.getPropertyValue('--color-justificada')?.trim() || '#F1C40F'
  };

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

  // Buscar histórico de frequência do aluno
  try {
    const response = await fetch(`http://localhost:8080/api/observations/student/${studentId}`);
    if (response.ok) {
      const observations = await response.json();
      
      // Filtrar apenas observações com attendanceType
      const attendanceRecords = observations.filter(obs => obs.attendanceType);
      
      if (attendanceRecords.length === 0) {
        frequenciaList.innerHTML = "<li>Nenhum registro de frequência encontrado</li>";
      } else {
        // Calcular estatísticas
        const presencas = attendanceRecords.filter(obs => obs.attendanceType === "PRESENTE").length;
        const faltas = attendanceRecords.filter(obs => obs.attendanceType === "FALTA").length;
        const justificadas = attendanceRecords.filter(obs => obs.attendanceType === "JUSTIFICADA").length;
        
        // Exibir resumo
        const summaryLi = document.createElement("li");
        summaryLi.innerHTML = `<strong>Resumo:</strong> ${presencas} Presenças, ${faltas} Faltas, ${justificadas} Justificadas`;
        summaryLi.style.fontWeight = "bold";
        frequenciaList.appendChild(summaryLi);
        
        // Exibir registros individuais
        attendanceRecords.forEach(obs => {
          const li = document.createElement("li");
          const color = ATTENDANCE_COLORS[obs.attendanceType] || ATTENDANCE_COLORS.PRESENTE;
          li.innerHTML = `<span style="color: ${color}; font-weight: bold;">${obs.attendanceType}</span> - ${obs.date || "Sem data"}`;
          frequenciaList.appendChild(li);
        });
      }
    } else {
      console.error("Erro ao carregar frequência");
      frequenciaList.innerHTML = "<li style='color: red;'>Erro ao carregar frequência do servidor</li>";
    }
  } catch (error) {
    console.error("Erro ao conectar com o servidor:", error);
    frequenciaList.innerHTML = "<li style='color: red;'>Erro ao conectar com o servidor.</li>";
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
