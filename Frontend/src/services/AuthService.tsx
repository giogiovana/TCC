import axios from "axios";

export async function Log(login: string, senha: string): Promise<boolean> {
  try {
    const credenciais = await axios.post(
      "http://localhost:8080/auth/login",
      { login, senha },
      { headers: { "Content-Type": "application/json" } },
    );

    if (credenciais.data.access_token) {
      localStorage.setItem("token", credenciais.data.access_token);
      localStorage.setItem("nome", credenciais.data.user.nome);
      return true;
    }

    return false;
  } catch (error) {
    console.error("Erro no login:", error);
    return false;
  }
}
