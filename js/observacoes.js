document.addEventListener("DOMContentLoaded", () => {
  const observacoesList = document.getElementById("observacoesList");

  // Obter studentId da URL
  const urlParams = new URLSearchParams(window.location.search);
  const studentId = urlParams.get('studentId');

  if (!studentId) {
    alert('Por favor, selecione um aluno primeiro!');
    window.location.href = 'turma.html';
    return;
  }

  // Carregar observações
  carregarObservacoes(parseInt(studentId));

  /**
   * Carregar observações do aluno do MockData
   */
  function carregarObservacoes(studentId) {
    // Buscar dados do aluno
    const aluno = MockData.users.find(u => u.id === studentId);
    
    if (!aluno) {
      alert('Aluno não encontrado!');
      window.location.href = 'turma.html';
      return;
    }

    // Atualizar título com nome do aluno se existir
    const pageTitle = document.querySelector("h1");
    if (pageTitle) {
      pageTitle.textContent = `Observações de ${aluno.nome}`;
    }

    // Buscar observações do aluno
    const observacoes = MockData.observations.filter(o => o.studentId === studentId);

    // Preencher lista de observações
    observacoesList.innerHTML = "";
    if (observacoes.length === 0) {
      observacoesList.innerHTML = "<li>Nenhuma observação registrada</li>";
    } else {
      observacoes.forEach(obs => {
        const li = document.createElement("li");
        const dataFormatada = obs.date ? new Date(obs.date).toLocaleDateString('pt-BR') : 'N/A';
        li.textContent = `${dataFormatada}: ${obs.description}`;
        li.dataset.obsId = obs.id;
        li.addEventListener("click", () => selecionarObservacao(li, obs));
        observacoesList.appendChild(li);
      });
    }
  }

  let observacaoSelecionada = null;
  let obsIdSelecionado = null;

  // Seleciona uma observação
  function selecionarObservacao(li, observacao) {
    if (observacaoSelecionada) observacaoSelecionada.classList.remove("selected");
    observacaoSelecionada = li;
    observacaoSelecionada.classList.add("selected");
    obsIdSelecionado = observacao.id;
  }

  // Botão Visualizar
  document.getElementById("visualizarBtn").addEventListener("click", () => {
    if (observacaoSelecionada) {
      const obs = MockData.observations.find(o => o.id === obsIdSelecionado);
      if (obs) {
        const data = obs.date ? new Date(obs.date).toLocaleDateString('pt-BR') : 'N/A';
        alert(`Observação:\nData: ${data}\nTexto: ${obs.description}`);
      }
    } else {
      alert("Selecione uma observação para visualizar.");
    }
  });

  // Botão Editar
  document.getElementById("editarBtn").addEventListener("click", () => {
    if (observacaoSelecionada) {
      const obs = MockData.observations.find(o => o.id === obsIdSelecionado);
      if (obs) {
        const novaDescricao = prompt("Editar observação:", obs.description);
        if (novaDescricao !== null && novaDescricao.trim() !== "") {
          obs.description = novaDescricao;
          saveToLocalStorage();
          alert("Observação atualizada com sucesso!");
          carregarObservacoes(parseInt(studentId));
        }
      }
    } else {
      alert("Selecione uma observação para editar.");
    }
  });

  // Botão Deletar
  document.getElementById("deletarBtn").addEventListener("click", () => {
    if (observacaoSelecionada) {
      if (confirm("Tem certeza que deseja deletar esta observação?")) {
        const index = MockData.observations.findIndex(o => o.id === obsIdSelecionado);
        if (index !== -1) {
          MockData.observations.splice(index, 1);
          saveToLocalStorage();
          alert("Observação deletada com sucesso!");
          observacaoSelecionada = null;
          obsIdSelecionado = null;
          carregarObservacoes(parseInt(studentId));
        }
      }
    } else {
      alert("Selecione uma observação para deletar.");
    }
  });

  // Botão Voltar
  document.getElementById("voltarBtn").addEventListener("click", () => {
    window.location.href = "turma.html";
  });
});
