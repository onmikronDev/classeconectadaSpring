document.addEventListener("DOMContentLoaded", async () => {
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

  // Buscar observações da API
  async function loadObservacoes() {
    try {
      // Se for aluno, buscar por studentId; se for professor/diretor, buscar todas
      let url = "http://localhost:8080/api/observations";
      if (user.tipo === "ALUNO") {
        url = `http://localhost:8080/api/observations/student/${user.id}`;
      }

      const response = await fetch(url);
      if (response.ok) {
        observacoes = await response.json();
        renderObservacoes();
      } else {
        console.error("Erro ao carregar observações");
        observacoesList.innerHTML = "<li style='color: red;'>Erro ao carregar observações do servidor</li>";
      }
    } catch (error) {
      console.error("Erro ao conectar com o servidor:", error);
      observacoesList.innerHTML = "<li style='color: red;'>Erro ao conectar com o servidor. Verifique se o backend está rodando.</li>";
    }
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

  // Editar observação na API
  async function editarObservacao(id, novaObservacao) {
    try {
      const obs = observacoes.find(o => o.id === id);
      const response = await fetch(`http://localhost:8080/api/observations/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...obs,
          content: novaObservacao
        }),
      });

      if (response.ok) {
        alert("Observação atualizada com sucesso!");
        await loadObservacoes();
        observacaoSelecionada = null;
      } else {
        alert("Erro ao atualizar observação.");
      }
    } catch (error) {
      console.error("Erro ao atualizar observação:", error);
      alert("Erro ao conectar com o servidor.");
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

  // Deletar observação na API
  async function deletarObservacao(id) {
    try {
      const response = await fetch(`http://localhost:8080/api/observations/${id}`, {
        method: "DELETE",
      });

      if (response.ok || response.status === 204) {
        alert("Observação deletada com sucesso!");
        await loadObservacoes();
        observacaoSelecionada = null;
      } else {
        alert("Erro ao deletar observação.");
      }
    } catch (error) {
      console.error("Erro ao deletar observação:", error);
      alert("Erro ao conectar com o servidor.");
    }
  }

  // Botão Voltar
  document.getElementById("voltarBtn").addEventListener("click", () => {
    window.location.href = "turma.html";
  });

  // Carregar observações ao inicializar
  await loadObservacoes();
});
