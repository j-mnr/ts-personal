const loginForm = document.getElementById("loginForm") as HTMLFormElement;
const username = document.getElementById("username") as HTMLInputElement;
const password = document.getElementById("password") as HTMLInputElement;

interface LoginRequest {
  username: string;
  password: string;
}

async function validForm(e: Event) {
  e.preventDefault();

  const loginRequest: LoginRequest = {
    username: username.value,
    password: password.value,
  };

  const response = await fetch("http://localhost:8080/login", {
    method: "POST",
    mode: "no-cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(loginRequest),
  });
  window.location.href = response.url;
}
loginForm.addEventListener("submit", validForm);
