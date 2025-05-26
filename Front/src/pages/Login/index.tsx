import { useEffect, useState } from "react";
import { ButtonSubmit, Container, Form } from "./styles";
import { useAuth } from "../../context/AuthProvider";
import { useNavigate } from "react-router";
import { toast, Slide } from "react-toastify";
import { useSearchParams } from "react-router-dom";
import Pergunta from "./pergunta";
import Input from "../../components/Input";

const Register = () => {
  const { login } = useAuth();

  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const [displayPergunta, setDisplayPergunta] = useState(true);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      await login(email, password);
      toast.success("Logado com sucesso!", {
        transition: Slide,
      });
      navigate("/user");
    } catch {
      toast.error("Erro ao logar!", {
        transition: Slide,
      });
    }
  };

  return (
    <>
      {displayPergunta && <Pergunta setDisplayPergunta={setDisplayPergunta} />}
      <Container>
        <Form>
          {/* <button
            type="button"
            onClick={() => {
              setEmail("teste@gmail.com");
              setPassword("12345678");
            }}
          >
            Teste
          </button> */}
          <h1>Login</h1>
          <Input
            type="email"
            label="Email"
            placeholder="exemplo@gmail.com"
            value={email}
            style={{
              width: "260px",
            }}
            onChange={(e) => setEmail((e.target as HTMLInputElement).value)}
          />
          <Input
            type="password"
            label="Senha"
            placeholder="Senha"
            value={password}
            style={{
              width: "260px",
            }}
            onChange={(e) => setPassword((e.target as HTMLInputElement).value)}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <ButtonSubmit type="button" onClick={handleLogin}>
              Entrar
            </ButtonSubmit>
            <span className="esqueceuSenha">Esqueceu sua senha?</span>
          </div>
          <span className="naoPossuiConta">Não possui uma conta? <span className="amarelo">Crie uma conta!</span></span>
        </Form>
      </Container>
    </>
  );
};

export default Register;
