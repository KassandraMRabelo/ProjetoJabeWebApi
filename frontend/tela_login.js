document.querySelector(".btn-login.custom").addEventListener("click", async () => {

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const response = await fetch("http://127.0.0.1:8000/api/login/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  });

  const data = await response.json();

  if (data.success) {
    localStorage.setItem("token", data.token);
    window.location.href = "tela_de_alerta.html";
  } else {
    alert("Usuário ou senha inválidos");
  }
});
