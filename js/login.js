document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  const togglePassword = document.getElementById("togglePassword");
  const senhaInput = document.getElementById("senha");
  const errorMessage = document.getElementById("errorMessage");

  // Toggle mostrar/ocultar senha
  togglePassword.addEventListener("click", () => {
    const type = senhaInput.type === "password" ? "text" : "password";
    senhaInput.type = type;
    togglePassword.textContent = type === "password" ? "👁️" : "🙈";
  });

  // Submissão do formulário
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;
    const lembrarMe = document.getElementById("lembrarMe").checked;

    // Validação simples
    if (!email || !senha) {
      showError("Por favor, preencha todos os campos.");
      return;
    }

    // Usuários mockados (dados de exemplo)
    const usuarios = [
      { id: 1, nome: "Administrador", email: "admin@email.com", senha: "123456", tipo: "DIRETOR" },
      { id: 2, nome: "João Silva", email: "joao@email.com", senha: "123456", tipo: "PROFESSOR" },
      { id: 3, nome: "Ana Santos", email: "ana@email.com", senha: "123456", tipo: "PROFESSOR" },
      { id: 4, nome: "Carlos Pereira", email: "carlos@email.com", senha: "123456", tipo: "PROFESSOR" },
      { id: 5, nome: "Alice Oliveira", email: "alice@email.com", senha: "123456", tipo: "ALUNO" },
      { id: 6, nome: "João Aluno", email: "joao.aluno@email.com", senha: "123456", tipo: "ALUNO" },
      { id: 7, nome: "Maria Costa", email: "maria@email.com", senha: "123456", tipo: "ALUNO" },
      { id: 8, nome: "Pedro Souza", email: "pedro@email.com", senha: "123456", tipo: "ALUNO" }
    ];

    // Verificar credenciais
    const user = usuarios.find(u => u.email === email && u.senha === senha);

    if (user) {
      // Salvar dados do usuário no localStorage
      localStorage.setItem("user", JSON.stringify(user));
      
      if (lembrarMe) {
        localStorage.setItem("lembrarMe", "true");
        localStorage.setItem("email", email);
      }

      // Sucesso - redireciona
      alert("Login realizado com sucesso!");
      window.location.href = "../html/index.html";
    } else {
      showError("Email ou senha incorretos.");
    }
  });

  // Função para mostrar erro
  function showError(message) {
    errorMessage.textContent = message;
    errorMessage.style.display = "block";

    setTimeout(() => {
      errorMessage.style.display = "none";
    }, 4000);
  }

  // Verificar se há "lembrar-me" salvo
  const lembrarMeSalvo = localStorage.getItem("lembrarMe");
  const emailSalvo = localStorage.getItem("email");

  if (lembrarMeSalvo === "true" && emailSalvo) {
    document.getElementById("email").value = emailSalvo;
    document.getElementById("lembrarMe").checked = true;
  }

  // Link "Esqueci minha senha"
  document.querySelector(".forgot-password").addEventListener("click", (e) => {
    e.preventDefault();
    alert("Funcionalidade de recuperação de senha será implementada.");
  });
});
