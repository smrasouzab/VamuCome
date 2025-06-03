import { ButtonSubmit, Container, Form } from "./styles";
import { useNavigate } from "react-router";
import { toast, Slide } from "react-toastify";
import Input from "../../components/Input";

import { useForm } from "react-hook-form";
import { isEmail } from "validator";
import api from "../../api";

interface FormDataCliente {
  nmUsuarioCliente: string;
  dsEmailCliente: string;
  dsSenhaCliente: string;
  nuCPF: string;
  nuTelCliente: string;
  dsLogradouro: string;
  nmNumero: string;
  dsComplemento?: string;
  endFavorito: boolean;
}

const Register = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataCliente>();

  const handleRegisterCliente = async (data: FormDataCliente) => {
    try {
      await api.post("/auth/cliente/register", {
        nmUsuarioCliente: data.nmUsuarioCliente,
        dsEmailCliente: data.dsEmailCliente,
        dsSenhaCliente: data.dsSenhaCliente,
        nuCPF: data.nuCPF,
        nuTelCliente: data.nuTelCliente,
        endereco: [{
          dsLogradouro: data.dsLogradouro,
          nmNumero: data.nmNumero,
          dsComplemento: data.dsComplemento,
          endFavorito: true,
        }]
      });
      toast.success("Cadastrado com sucesso!", {
        transition: Slide,
      });
      navigate("/login");
    } catch (error) {
      console.error("Erro ao cadastrar:", error);
      toast.error("Erro ao cadastrar!", {
        transition: Slide,
      });
    }
  };

  return (
    <>
      <Container>
        <Form onSubmit={handleSubmit(handleRegisterCliente)}>
          <h1>Cadastro</h1>
          <div className="linha">
            <div className="coluna">
              <Input
                type="text"
                label="Nome de Usuário"
                placeholder="Seu nome"
                style={{
                  width: "260px",
                }}
                errors={errors.nmUsuarioCliente}
                {...register("nmUsuarioCliente", {
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
                errors={errors.dsEmailCliente}
                {...register("dsEmailCliente", {
                  required: "Email é obrigatório",
                  validate: (value) => isEmail(value) || "Email inválido",
                })}
              />
              <Input
                type="text"
                label="CPF"
                placeholder="000.000.000-00"
                style={{
                  width: "260px",
                }}
                errors={errors.nuCPF}
                {...register("nuCPF", {
                  required: "CPF é obrigatório",
                })}
              />
              <Input
                type="text"
                label="Telefone"
                placeholder="(00) 00000-0000"
                style={{
                  width: "260px",
                }}
                errors={errors.nuTelCliente}
                {...register("nuTelCliente", {
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
                errors={errors.dsSenhaCliente}
                {...register("dsSenhaCliente", {
                  required: "Senha é obrigatória",
                  minLength: {
                    value: 8,
                    message: "Senha deve ter pelo menos 8 caracteres",
                  },
                })}
              />
            </div>
            <div className="coluna">
              <Input
                type="text"
                label="Logradouro"
                placeholder="Rua, Avenida, etc."
                style={{
                  width: "260px",
                }}
                errors={errors.dsLogradouro}
                {...register("dsLogradouro", {
                  required: "Logradouro é obrigatório",
                })}
              />
              <Input
                type="text"
                label="Número"
                placeholder="Número da residência"
                style={{
                  width: "260px",
                }}
                errors={errors.nmNumero}
                {...register("nmNumero", {
                  required: "Número é obrigatório",
                })}
              />
              <Input
                type="text"
                label="Complemento"
                placeholder="Complemento (opcional)"
                style={{
                  width: "260px",
                }}
                {...register("dsComplemento")}
              />
            </div>
          </div>
          <ButtonSubmit type="submit">
            Cadastrar
          </ButtonSubmit>
        </Form>
        {/* <Form onSubmit={handleSubmit(handleLogin)}>
          <h1>Cadastro</h1>
          <Input
            type="text"
            label="Razão Social"
            placeholder="Sua Razão Social"
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
            label="CNPJ"
            placeholder="00.000.000/0000-00"
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
        </Form> */}
      </Container>
    </>
  );
};

export default Register;
