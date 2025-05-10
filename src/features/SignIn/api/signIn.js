import apiConfig from "../../../apiConfig.json"

const userLogIn = (
  loginData,
  setResponse,
  setErrorResponse,
  onLogin
) => {
  console.log('data before sending', loginData)
  fetch(`${apiConfig.BASE_URL}BackendForPixel/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(loginData)
  })
    .then(async (response) => {
      const token = await response.text();

      if (!response.ok) {
        console.error("Server error response:", token);
        // Допустим сервер всё равно вернёт JSON при ошибке
        try {
          const errorData = JSON.parse(token);
          if (errorData.message === "Wrong password") {
            setErrorResponse("Пароль неверный");
          } else {
            setErrorResponse(errorData.message || "Ошибка входа");
          }
        } catch {
          setErrorResponse("Не удалось войти");
        }
        return null;
      }

      return token;
    })
    .then((token) => {
      if (!token) return;

      console.log("Access token:", token);
      localStorage.setItem("token", token);
      localStorage.setItem('currentUserEmail', loginData.email);
      localStorage.setItem("creationTokenDate", new Date().toISOString());
      setResponse("login successful");
      console.log(onLogin)
      onLogin(token);
    })
    .catch((error) => {
      console.error("ErrorType: ", error)
    })
}
export default userLogIn
