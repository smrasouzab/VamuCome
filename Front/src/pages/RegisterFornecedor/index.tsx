import { ButtonSubmit, Container, Form } from "./styles";
import { useNavigate } from "react-router";
import { toast, Slide } from "react-toastify";
import Input from "../../components/Input";

import { useForm } from "react-hook-form";
import { isEmail } from "validator";
import api from "../../api";

interface FormDataFornecedor {
  nmUsuarioFornecedor: string;
  dsEmailFornecedor: string;
  dsSenhaFornecedor: string;
  dsRazaoSocial: string;
  nuCNPJ: string;
  dtHorarioAbertura: string;
  dtHorarioFechamento: string;
  vlMinimoCompra: string;
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
  } = useForm<FormDataFornecedor>();

  const handleRegisterFornecedor = async (data: FormDataFornecedor) => {
    try {
      await api.post("/auth/fornecedor/register", {
        nmUsuarioFornecedor: data.nmUsuarioFornecedor,
        dsEmailFornecedor: data.dsEmailFornecedor,
        dsSenhaFornecedor: data.dsSenhaFornecedor,
        dsRazaoSocial: data.dsRazaoSocial,
        nuCNPJ: data.nuCNPJ,
        dtHorarioAbertura: data.dtHorarioAbertura,
        dtHorarioFechamento: data.dtHorarioFechamento,
        vlMinimoCompra: data.vlMinimoCompra,
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
        <Form onSubmit={handleSubmit(handleRegisterFornecedor)}>
          <h1>Cadastro</h1>
          <div className="linha">
            <div className="coluna">

              <Input
                type="text"
                label="Nome de Usuário"
                placeholder="Nome de Usuário"
                style={{
                  width: "260px",
                }}
                errors={errors.nmUsuarioFornecedor}
                {...register("nmUsuarioFornecedor", {
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
                errors={errors.dsEmailFornecedor}
                {...register("dsEmailFornecedor", {
                  required: "Email é obrigatório",
                  validate: (value) => isEmail(value) || "Email inválido",
                })}
              />
              <Input
                type="text"
                label="Razão Social"
                placeholder="Sua Razão Social"
                style={{
                  width: "260px",
                }}
                errors={errors.dsRazaoSocial}
                {...register("dsRazaoSocial", {
                  required: "Nome de Usuário é obrigatório",
                })}
              />
              <Input
                type="text"
                label="CNPJ"
                placeholder="00.000.000/0000-00"
                style={{
                  width: "260px",
                }}
                errors={errors.nuCNPJ}
                {...register("nuCNPJ", {
                  required: "CPF/CNPJ é obrigatório",
                })}
              />
              <Input
                type="password"
                label="Senha"
                placeholder="Senha"
                style={{
                  width: "260px",
                }}
                errors={errors.dsSenhaFornecedor}
                {...register("dsSenhaFornecedor", {
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
                type="time"
                label="Horário de Abertura"
                style={{
                  width: "260px",
                }}
                errors={errors.dtHorarioAbertura}
                {...register("dtHorarioAbertura", {
                  required: "Horário de Abertura é obrigatório",
                })}
              />
              <Input
                type="time"
                label="Horário de Fechamento"
                style={{
                  width: "260px",
                }}
                errors={errors.dtHorarioFechamento}
                {...register("dtHorarioFechamento", {
                  required: "Horário de Fechamento é obrigatório",
                })}
              />
              <Input
                type="number"
                label="Valor Mínimo da Compra"
                placeholder="0"
                style={{
                  width: "260px",
                }}
                errors={errors.vlMinimoCompra}
                {...register("vlMinimoCompra", {
                  required: "Valor Mínimo da Compra é obrigatório",
                })}
              />
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
                label="Complemento (opcional)"
                placeholder="Apto, Bloco, etc."
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
      </Container>
    </>
  );
};

export default Register;
