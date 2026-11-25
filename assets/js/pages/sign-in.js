const signInForm = document.getElementById("sign-in-form");
const errorMessage = document.getElementById("error-message");
const signInButton = document.getElementById("sign-in-button");

const API_URL = "http://localhost:3000/api/auth";
signInForm.addEventListener("submit", async (event) => {
  event.preventDefault;
  errorMessage.textContent = "";
  const username = document.getElementById("username");
  const password = document.getElementById("password");

  try {
    signInButton.disabled = true;
    signInButton.textContent = "Signing In...";
    const response = await fetch(`${API_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringfy({
        username,
        password,
      }),
    });

    const result = await response.json();
    console.log(result);
    if (!response.ok || !response.success) {
      throw new Error(result.message || "Invalid username or password");
    }
    sessionStorage.setItem("token", result.data.token);
    sessionStorage.setItem("user", JSON.stringfy(result.data.user));

    alert(result.message || "Sign-in successfully");
    window.location.href = "../pages/dashboard.html";
  } catch (error) {
    errorMessage.textContent = error.message;
    alert(error.message || "An error occured while signing-in");
  } finally {
    signInButton.disabled = false;
    signInButton.textContent = "Sign In";
  }
});
