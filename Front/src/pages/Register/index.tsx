import { ButtonSubmit, Container, Form } from "./styles";
import { useNavigate } from "react-router";
import { toast, Slide } from "react-toastify";
import Input from "../../components/Input";

import { useForm } from "react-hook-form";
import { isEmail } from "validator";
import api from "../../api";

interface FormData {
  nmUsuario: string;
  email: string;
  senha: string;
  telefone: string;
  numCpfCnpj: string;
}

const Register = () => {
  const navigate = useNavigate();

  // const [searchParams] = useSearchParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const handleLogin = async (data: FormData) => {
    try {
      await api.post("/auth/register", data);
      toast.success("Cadastrado com sucesso!", {
        transition: Slide,
      });
      navigate("/login");
    } catch {
      toast.error("Erro ao cadastrar!", {
        transition: Slide,
      });
    }
  };

  return (
    <>
      <Container>
        <Form onSubmit={handleSubmit(handleLogin)}>
          <h1>Cadastro</h1>
          <Input
            type="text"
            label="Nome de Usuário"
            placeholder="Seu nome"
            style={{
              width: "260px",
            }}
            errors={errors.nmUsuario}
            {...register("nmUsuario", {
              required: "Nome de Usuário é obrigatório",
            })}
          />
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
            type="text"
            label="CPF/CNPJ"
            placeholder="000.000.000-00/00.000.000/0000-00"
            style={{
              width: "260px",
            }}
            errors={errors.numCpfCnpj}
            {...register("numCpfCnpj", {
              required: "CPF/CNPJ é obrigatório",
            })}
          />
          <Input
            type="text"
            label="Telefone"
            placeholder="(00) 00000-0000"
            style={{
              width: "260px",
            }}
            errors={errors.telefone}
            {...register("telefone", {
              required: "Telefone é obrigatório",
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
          <ButtonSubmit type="submit">
            Cadastrar
          </ButtonSubmit>
        </Form>
      </Container>
    </>
  );
};

export default Register;
