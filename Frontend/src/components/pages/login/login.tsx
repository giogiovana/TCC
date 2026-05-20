import * as Style from "../../../Styles/login.Styled";
import { useState } from "react";
import { Log } from "../../../services/AuthService";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";

type Props = {
  onLogin: () => void;
};

export default function Login({ onLogin }: Props) {
  const [showPassword, setShowPassword] = useState(false);

  const [login, setLogin] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const success = await Log(login, senha);
    if (success) {
      onLogin();
    } else {
      setErro("Usuário ou senha inválidos :(");
    }
  };

  return (
    <Style.Container>
      <form onSubmit={handleSubmit}>
        <div className="logo">
          <img src="src/assets/Logo.png" alt="Logo" />
        </div>

        <section>
          <p>Login</p>
          <input
            type="text"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
          />
        </section>

        <section style={{ position: "relative" }}>
          <p>Senha</p>
          <input
            type={showPassword ? "text" : "password"}
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />

          <button
            style={{
              position: "absolute",
              right: 10,
              top: "55%",
              color: "#ffff",
            }}
            type="button"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <MdVisibilityOff size={22} />
            ) : (
              <MdVisibility size={22} />
            )}
          </button>
        </section>

        {erro && <div className="mensagemErro">{erro}</div>}

        <section>
          <button className="button1" type="submit">
            Entrar
          </button>
          <p className="p">TCC foda da Gio e do Bruno 0.0.1</p>
        </section>
      </form>

      <img src="/src/assets/fotofundo.jpg" className="foto" />
    </Style.Container>
  );
}
