document.addEventListener("DOMContentLoaded", async () => {
  const observacoesList = document.getElementById("observacoesList");

  // ✅ CORRIGIDO: Obter studentId da URL (similar ao historico.js)
  const urlParams = new URLSearchParams(window.location.search);
  const studentId = urlParams.get('studentId');

  if (!studentId) {
    alert('ID do aluno não fornecido. Redirecionando...');
    window.location.href = 'turma.html';
    return;
  }

  let observacoes = [];
  let observacaoSelecionada = null;
  let observacaoSelecionadaObj = null;

  // Modal de edição
  const editModal = document.getElementById("editModal");
  const closeEditModal = document.getElementById("closeEditModal");
  const editForm = document.getElementById("editForm");
  const editObservationId = document.getElementById("editObservationId");
  const editObservationContent = document.getElementById("editObservationContent");
  const editObservationDate = document.getElementById("editObservationDate");

  // ✅ CORRIGIDO: Carregar observações da API
  await carregarObservacoes(studentId);

  /**
   * ✅ CORRIGIDO: Carregar observações do aluno da API
   */
  async function carregarObservacoes(studentId) {
    try {
      // Buscar dados do aluno
      const alunoResponse = await fetch(`http://localhost:8080/api/users/${studentId}`);
      if (!alunoResponse.ok) throw new Error('Erro ao carregar dados do aluno');
      const aluno = await alunoResponse.json();

      // Atualizar título com nome do aluno se existir
      const pageTitle = document.querySelector("h1");
      if (pageTitle) {
        pageTitle.textContent = `Observações de ${aluno.nome}`;
      }

      // Buscar observações do aluno
      const observacoesResponse = await fetch(`http://localhost:8080/api/observations/student/${studentId}`);
      if (!observacoesResponse.ok) throw new Error('Erro ao carregar observações');
      observacoes = await observacoesResponse.json();

      // Preencher lista de observações
      renderObservacoes();

    } catch (error) {
      console.error('Erro ao carregar observações:', error);
      alert('Erro ao carregar observações. Verifique se o backend está rodando.');
    }
  }

  function renderObservacoes() {
    observacoesList.innerHTML = "";
    if (observacoes.length === 0) {
      observacoesList.innerHTML = "<li>Nenhuma observação registrada</li>";
    } else {
      observacoes.forEach(obs => {
        const li = document.createElement("li");
        const dataFormatada = obs.date ? new Date(obs.date).toLocaleDateString('pt-BR') : 'N/A';
        const conteudo = obs.content || 'Sem descrição';
        li.textContent = `${dataFormatada}: ${conteudo}`;
        li.dataset.observationId = obs.id;
        li.addEventListener("click", () => selecionarObservacao(li, obs));
        observacoesList.appendChild(li);
      });
    }
  }

  // Seleciona uma observação
  function selecionarObservacao(li, observacao) {
    if (observacaoSelecionada) observacaoSelecionada.classList.remove("selected");
    observacaoSelecionada = li;
    observacaoSelecionadaObj = observacao;
    observacaoSelecionada.classList.add("selected");
  }

  // Botão Visualizar
  document.getElementById("visualizarBtn").addEventListener("click", () => {
    if (observacaoSelecionadaObj) {
      const texto = observacaoSelecionadaObj.content || 'Sem descrição';
      const data = observacaoSelecionadaObj.date ? new Date(observacaoSelecionadaObj.date).toLocaleDateString('pt-BR') : 'N/A';
      alert(`Observação:\nData: ${data}\nConteúdo: ${texto}`);
    } else {
      alert("Selecione uma observação para visualizar.");
    }
  });

  // Botão Editar
  document.getElementById("editarBtn").addEventListener("click", () => {
    if (observacaoSelecionadaObj) {
      // Preencher modal com dados da observação
      editObservationId.value = observacaoSelecionadaObj.id;
      editObservationContent.value = observacaoSelecionadaObj.content || '';
      editObservationDate.value = observacaoSelecionadaObj.date || '';
      editModal.style.display = "flex";
    } else {
      alert("Selecione uma observação para editar.");
    }
  });

  // Fechar modal
  closeEditModal.addEventListener("click", () => {
    editModal.style.display = "none";
  });

  // Salvar edição
  editForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const id = parseInt(editObservationId.value);
    const content = editObservationContent.value;
    const date = editObservationDate.value;

    const observationData = {
      content: content,
      date: date,
      student: { id: parseInt(studentId) }
    };

    try {
      const response = await fetch(`http://localhost:8080/api/observations/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(observationData)
      });

      if (response.ok) {
        alert("Observação atualizada com sucesso!");
        editModal.style.display = "none";
        await carregarObservacoes(studentId);
        observacaoSelecionada = null;
        observacaoSelecionadaObj = null;
      } else {
        const error = await response.json();
        alert(`Erro ao atualizar observação: ${error.error || 'Erro desconhecido'}`);
      }
    } catch (error) {
      console.error('Erro ao atualizar observação:', error);
      alert('Erro ao conectar com o servidor.');
    }
  });

  // Botão Deletar
  document.getElementById("deletarBtn").addEventListener("click", async () => {
    if (observacaoSelecionadaObj) {
      if (!confirm(`Tem certeza que deseja deletar esta observação?\n${observacaoSelecionadaObj.content}`)) {
        return;
      }

      try {
        const response = await fetch(`http://localhost:8080/api/observations/${observacaoSelecionadaObj.id}`, {
          method: 'DELETE'
        });

        if (response.ok || response.status === 204) {
          alert("Observação deletada com sucesso!");
          await carregarObservacoes(studentId);
          observacaoSelecionada = null;
          observacaoSelecionadaObj = null;
        } else {
          alert('Erro ao deletar observação.');
        }
      } catch (error) {
        console.error('Erro ao deletar observação:', error);
        alert('Erro ao conectar com o servidor.');
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
