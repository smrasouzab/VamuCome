import { useState } from "react";
import { ButtonSubmit, Container, Form } from "./styles";
import { useAuth } from "../../context/AuthProvider";
import { useNavigate, NavLink } from "react-router";
import { toast, Slide } from "react-toastify";
// import { useSearchParams } from "react-router-dom";
import Pergunta from "./pergunta";
import Input from "../../components/Input";

import { useForm } from "react-hook-form";
import { isEmail } from "validator";

interface FormData {
  email: string;
  senha: string;
}

const Login = () => {
  const { login } = useAuth();

  const navigate = useNavigate();

  // const [searchParams] = useSearchParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const [displayPergunta, setDisplayPergunta] = useState(true);

  const handleLogin = async (data: FormData) => {
    try {
      await login(data.email, data.senha);
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
        <Form onSubmit={handleSubmit(handleLogin)}>
          <h1>Login</h1>
          <Input
            type="text"
            label="Email"
            placeholder="exemplo@gmail.com"
            style={{
              width: "260px",
            }}
            errors={errors.email}
            {...register("email", {
              required: "Email é obrigatório",
              validate: (value) => isEmail(value) || "Email inválido",
            })}
          />
          <Input
            type="password"
            label="Senha"
            placeholder="Senha"
            style={{
              width: "260px",
            }}
            errors={errors.senha}
            {...register("senha", {
              required: "Senha é obrigatória",
              minLength: {
                value: 8,
                message: "Senha deve ter pelo menos 8 caracteres",
              },
            })}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <ButtonSubmit type="submit">
              Entrar
            </ButtonSubmit>
            <span className="esqueceuSenha">Esqueceu sua senha?</span>
          </div>
          <span className="naoPossuiConta">Não possui uma conta? <NavLink to="/register" className="amarelo">Crie uma conta!</NavLink></span>
        </Form>
      </Container>
    </>
  );
};

export default Login;
