document.addEventListener("DOMContentLoaded", () => {
  const observacoesList = document.getElementById("observacoesList");

  // Obter dados do usuário logado do localStorage
  const userStr = localStorage.getItem("user");
  if (!userStr) {
    alert("Usuário não autenticado. Redirecionando para login.");
    window.location.href = "Login.html";
    return;
  }

  const user = JSON.parse(userStr);
  let observacoes = [];
  let observacaoSelecionada = null;

  // Buscar observações do localStorage
  function loadObservacoes() {
    // Se for aluno, buscar apenas suas observações
    if (user.tipo === "ALUNO") {
      observacoes = dataManager.getObservacoesPorAluno(user.id);
    } else {
      // Se for professor/diretor, buscar todas
      observacoes = dataManager.getObservacoes();
    }
    
    // Adicionar nomes de alunos às observações
    const usuarios = dataManager.getUsuarios();
    observacoes = observacoes.map(obs => {
      const aluno = usuarios.find(u => u.id === obs.student_id);
      return { ...obs, student: { nome: aluno ? aluno.nome : "Desconhecido" } };
    });
    
    renderObservacoes();
  }

  // Renderizar lista de observações
  function renderObservacoes() {
    observacoesList.innerHTML = "";
    if (observacoes.length === 0) {
      observacoesList.innerHTML = "<li>Nenhuma observação encontrada</li>";
      return;
    }

    observacoes.forEach((obs) => {
      const li = document.createElement("li");
      li.textContent = `${obs.student?.nome || "Aluno desconhecido"} - ${obs.content || "Sem descrição"} (${obs.date || "Sem data"})`;
      li.addEventListener("click", () => selecionarObservacao(li, obs));
      observacoesList.appendChild(li);
    });
  }

  // Seleciona uma observação
  function selecionarObservacao(li, obs) {
    if (observacaoSelecionada) {
      observacaoSelecionada.element.classList.remove("selected");
    }
    observacaoSelecionada = { element: li, data: obs };
    li.classList.add("selected");
  }

  // Botão Visualizar
  document.getElementById("visualizarBtn").addEventListener("click", () => {
    if (observacaoSelecionada) {
      const obs = observacaoSelecionada.data;
      alert(`Observação:\nAluno: ${obs.student?.nome || "Desconhecido"}\nObservação: ${obs.content || "Sem descrição"}\nData: ${obs.date || "Sem data"}`);
    } else {
      alert("Selecione uma observação para visualizar.");
    }
  });

  // Botão Editar
  document.getElementById("editarBtn").addEventListener("click", () => {
    if (observacaoSelecionada) {
      const obs = observacaoSelecionada.data;
      const novaObservacao = prompt("Editar observação:", obs.content);
      if (novaObservacao !== null && novaObservacao.trim() !== "") {
        editarObservacao(obs.id, novaObservacao);
      }
    } else {
      alert("Selecione uma observação para editar.");
    }
  });

  // Editar observação no localStorage
  function editarObservacao(id, novaObservacao) {
    const todasObservacoes = dataManager.getObservacoes();
    const index = todasObservacoes.findIndex(o => o.id === id);
    if (index !== -1) {
      todasObservacoes[index].content = novaObservacao;
      dataManager.setObservacoes(todasObservacoes);
      alert("Observação atualizada com sucesso!");
      loadObservacoes();
      observacaoSelecionada = null;
    }
  }

  // Botão Deletar
  document.getElementById("deletarBtn").addEventListener("click", () => {
    if (observacaoSelecionada) {
      if (confirm("Tem certeza que deseja deletar esta observação?")) {
        deletarObservacao(observacaoSelecionada.data.id);
      }
    } else {
      alert("Selecione uma observação para deletar.");
    }
  });

  // Deletar observação do localStorage
  function deletarObservacao(id) {
    const todasObservacoes = dataManager.getObservacoes();
    const novasObservacoes = todasObservacoes.filter(o => o.id !== id);
    dataManager.setObservacoes(novasObservacoes);
    alert("Observação deletada com sucesso!");
    loadObservacoes();
    observacaoSelecionada = null;
  }

  // Botão Voltar
  document.getElementById("voltarBtn").addEventListener("click", () => {
    window.location.href = "turma.html";
  });

  // Carregar observações ao inicializar
  loadObservacoes();
});
