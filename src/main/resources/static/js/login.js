document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  const togglePassword = document.getElementById("togglePassword");
  const senhaInput = document.getElementById("senha");
  const errorMessage = document.getElementById("errorMessage");

  // Toggle mostrar/ocultar senha
  togglePassword.addEventListener("click", () => {
    const type = senhaInput.type === "password" ? "text" : "password";
    senhaInput. type = type;
    togglePassword. textContent = type === "password" ? "👁️" : "🙈";
  });

  // Submissão do formulário
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;
    const lembrarMe = document.getElementById("lembrarMe").checked;

    // Validação simples
    if (!email || ! senha) {
      showError("Por favor, preencha todos os campos.");
      return;
    }

    // Simulação de login (substitua com sua lógica real)
    if (email === "admin@email.com" && senha === "123456") {
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
    errorMessage. textContent = message;
    errorMessage.style.display = "block";

    setTimeout(() => {
      errorMessage. style.display = "none";
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
