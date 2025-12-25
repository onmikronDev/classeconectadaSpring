document.addEventListener("DOMContentLoaded", () => {
  const materiasList = document.getElementById("materiasList");
  const notasList = document.getElementById("notasList");
  const pageTitle = document.querySelector("h1");

  // Obter studentId da URL
  const urlParams = new URLSearchParams(window.location.search);
  const studentId = urlParams.get('studentId');

  if (!studentId) {
    alert('Por favor, selecione um aluno primeiro!');
    window.location.href = 'turma.html';
    return;
  }

  // Carregar histórico do aluno
  carregarHistorico(parseInt(studentId));

  /**
   * Carregar histórico do aluno do MockData
   */
  function carregarHistorico(studentId) {
    // Buscar dados do aluno
    const aluno = MockData.users.find(u => u.id === studentId);
    
    if (!aluno) {
      alert('Aluno não encontrado!');
      window.location.href = 'turma.html';
      return;
    }

    // Atualizar título com nome do aluno
    if (pageTitle) {
      pageTitle.textContent = `Histórico de ${aluno.nome}`;
    }

    // Buscar notas do aluno
    const notas = MockData.grades.filter(g => g.studentId === studentId);

    // Organizar notas por matéria
    const notasPorMateria = {};
    notas.forEach(nota => {
      const materiaNome = nota.subject.name;
      if (!notasPorMateria[materiaNome]) {
        notasPorMateria[materiaNome] = [];
      }
      notasPorMateria[materiaNome].push(nota);
    });

    // Preencher lista de matérias
    materiasList.innerHTML = "";
    Object.keys(notasPorMateria).forEach((materia) => {
      const li = document.createElement("li");
      li.textContent = materia;
      li.addEventListener("click", () => filtrarNotasPorMateria(materia, notasPorMateria));
      materiasList.appendChild(li);
    });

    // Inicialmente mostra todas as notas
    if (Object.keys(notasPorMateria).length > 0) {
      mostrarTodasNotas(notasPorMateria);
    } else {
      notasList.innerHTML = "<li>Nenhuma nota registrada</li>";
    }
  }

  /**
   * Filtra as notas com base na matéria selecionada
   */
  function filtrarNotasPorMateria(materia, notasPorMateria) {
    notasList.innerHTML = "";
    notasPorMateria[materia].forEach((nota) => {
      const li = document.createElement("li");
      const dataFormatada = nota.examDate ? new Date(nota.examDate).toLocaleDateString('pt-BR') : 'N/A';
      li.textContent = `Nota: ${nota.value} - Data: ${dataFormatada}`;
      if (nota.description) {
        li.title = nota.description;
      }
      notasList.appendChild(li);
    });
  }

  /**
   * Mostra todas as notas agrupadas por matéria
   */
  function mostrarTodasNotas(notasPorMateria) {
    notasList.innerHTML = "";
    Object.entries(notasPorMateria).forEach(([materia, notas]) => {
      notas.forEach((nota) => {
        const li = document.createElement("li");
        const dataFormatada = nota.examDate ? new Date(nota.examDate).toLocaleDateString('pt-BR') : 'N/A';
        li.textContent = `${materia}: Nota ${nota.value} - Data: ${dataFormatada}`;
        if (nota.description) {
          li.title = nota.description;
        }
        notasList.appendChild(li);
      });
    });
  }

  // Botão Voltar
  document.getElementById("voltarBtn").addEventListener("click", () => {
    window.location.href = "turma.html";
  });
});
