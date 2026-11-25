const token = sessionStorage.getItem("token");

const SIGN_IN_PAGE = "/auth/sign-in.html";

const isAuthenticated = () => {
  if (!token) {
    return false;
  }

  try {
    console.log("Account Authenthecated");
    const payload = JSON.parse(atob(token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/")));

    const currentTime = Math.floor(Date.now() / 1000);

    if (!payload.exp || payload.exp <= currentTime) {
      sessionStorage.clear();
      return false;
    }

    return true;
  } catch (error) {
    console.error(error);
    sessionStorage.clear();
    return false;
  }
};

if (!isAuthenticated) {
  window.location.replace(SIGN_IN_PAGE);
}
