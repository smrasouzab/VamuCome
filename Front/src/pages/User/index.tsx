import { useCallback, useEffect, useState } from "react";
import {
  ButtonSubmit,
  Container,
  ContainerModal,
  Form,
  Header,
} from "./styles";
import { useAuth } from "../../context/AuthProvider";
// import useTheme from "../../hooks/useTheme";
// import { useTheme } from "../../context/ThemeProvidder";
// import { useNavigate } from "react-router";
// import api from "../../api";
// import { toast } from "react-toastify";
import Input from "../../components/Input";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useTheme } from "../../context/ThemeProvidder";
import api from "../../api";
import { Slide, toast } from "react-toastify";
import { useForm } from "react-hook-form";

export interface Cliente {
  idCliente: number;
  dataCadastroCliente: string;
  nmUsuarioCliente: string;
  dsEmailCliente: string;
  nuCPF: string;
  nuTelCliente: string;
  endereco: {
    idEndereco: number;
    dsLogradouro: string;
    nmNumero: string;
    dsComplemento: string;
    endFavorito: boolean;
  }[];
}

export interface Fornecedor {
  idFornecedor: number;
  dataCadastroFornecedor: string;
  nmUsuarioFornecedor: string;
  dsEmailFornecedor: string;
  dsRazaoSocial: string;
  nuCNPJ: string;
  dtHorarioAbertura: string;
  dtHorarioFechamento: string;
  vlMinimoCompra: number;
  endereco: {
    idEndereco: number;
    dsLogradouro: string;
    nmNumero: string;
    dsComplemento: string;
    endFavorito: boolean;
  };
}

const User = () => {
  const { user } = useAuth();

  const { theme } = useTheme();

  // const { toogleTheme } = useTheme();

  // const navigate = useNavigate();

  const [dadosFornecedor, setDadosFornecedor] = useState<Fornecedor | null>(
    null
  );

  const [dadosCliente, setDadosCliente] = useState<Cliente | null>(null);

  const [showModalEndereco, setShowModalEndereco] = useState(false);

  const handleClose = () => setShowModalEndereco(false);
  // const handleShow = () => setShowModalEndereco(true);

  const {
    register: registerF,
    handleSubmit: handleSubmitF,
    reset: resetF,
  } = useForm<Fornecedor>();

  const {
    register: registerC,
    handleSubmit: handleSubmitC,
    reset: resetC,
  } = useForm<Cliente>();

  const handleSubmitFornecedor = useCallback(
    async (data: Fornecedor) => {
      console.log("teste");
      await api
        .put(`/fornecedor/${user.id}`, {
          ...data,
          dsRazaoSocial: data.dsRazaoSocial,
          dtHorarioAbertura: `2025-01-01T${data.dtHorarioAbertura}.000Z`,
          dtHorarioFechamento: `2025-01-01T${data.dtHorarioFechamento}.000Z`,
        })
        .then(() => {
          toast.success("Dados atualizados com sucesso!", {
            transition: Slide,
          });
        })
        .catch(() => {
          toast.error("Erro ao atualizar dados!", {
            transition: Slide,
          });
        });

      // await api
      //   .put(`/fornecedor/endereco/atualizar/${user.id}/`, {
      //     ...data.endereco,
      //   })
      //   .then(() => {
      //     toast.success("Endereço atualizado com sucesso!", {
      //       transition: Slide,
      //     });
      //   })
      //   .catch(() => {
      //     toast.error("Erro ao atualizar endereço!", {
      //       transition: Slide,
      //     });
      //   });
    },
    [user.id]
  );

  useEffect(() => {
    if (user.role === "FORNECEDOR") {
      api.get<Fornecedor>(`/fornecedor/${user.id}`).then((response) => {
        setDadosFornecedor(response.data);
        resetF({
          ...response.data,
          dtHorarioAbertura: response.data.dtHorarioAbertura
            ? new Date(response.data.dtHorarioAbertura).toTimeString().split(" ")[0]
            : "",
          dtHorarioFechamento: response.data.dtHorarioFechamento
            ? new Date(response.data.dtHorarioFechamento).toTimeString().split(" ")[0]
            : "",
          vlMinimoCompra: response.data.vlMinimoCompra || 0,
          endereco: {
            ...response.data.endereco,
          },
        });
      });
    } else if (user.role === "CLIENTE") {
      api.get<Cliente>(`/cliente/${user.id}`).then((response) => {
        setDadosCliente(response.data);
        resetC({
          ...response.data,
          endereco: response.data.endereco.map((end) => ({
            ...end,
          })),
        });
      });
    }
  }, [user, resetF, resetF]);

  return (
    <>
      <Container>
        <Header>
          <h1>Bem-Vindo, {user.nome}.</h1>
        </Header>
        <Form onSubmit={handleSubmitF(handleSubmitFornecedor)}>
          <div className="coluna">
            <span className="title">Dados Pessoais</span>
            <Input
              type="text"
              label="Razão Social"
              placeholder="Sua Razão Social"
              {...registerF("dsRazaoSocial")}
              style={{
                width: "200px",
              }}
            />
            <Input
              type="text"
              label="CNPJ"
              placeholder="CNPJ"
              {...registerF("nuCNPJ")}
              style={{
                width: "200px",
              }}
            />
          </div>
          <div className="coluna">
            <span className="title">Dados Loja</span>
            <Input
              type="time"
              label="Horário de Abertura"
              placeholder="Horário de Abertura"
              {...registerF("dtHorarioAbertura")}
              defaultValue={
                new Date(dadosFornecedor?.dtHorarioAbertura || "")
                  .toTimeString()
                  .split(" ")[0]
              }
              style={{
                width: "200px",
              }}
            />
            <Input
              type="time"
              label="Horário de Fechamento"
              placeholder="Horário de Fechamento"
              {...registerF("dtHorarioFechamento")}
              defaultValue={
                new Date(dadosFornecedor?.dtHorarioFechamento || "")
                  .toTimeString()
                  .split(" ")[0]
              }
              style={{
                width: "200px",
              }}
            />
            <Input
              type="text"
              label="Valor Mínimo de Pedido"
              placeholder="Valor Mínimo de Pedido"
              {...registerF("vlMinimoCompra")}
              defaultValue={String(dadosFornecedor?.vlMinimoCompra || "")}
              style={{
                width: "200px",
              }}
            />
          </div>
          <div className="coluna">
            <span className="title">Endereço</span>
            <Input
              type="text"
              label="Valor Mínimo de Pedido"
              placeholder="Valor Mínimo de Pedido"
              {...registerF("endereco.dsLogradouro")}
              defaultValue={dadosFornecedor?.endereco.dsLogradouro || ""}
              style={{
                width: "200px",
              }}
            />
            <Input
              type="text"
              label="Valor Mínimo de Pedido"
              placeholder="Valor Mínimo de Pedido"
              {...registerF("endereco.nmNumero")}
              defaultValue={dadosFornecedor?.endereco.nmNumero || ""}
              style={{
                width: "200px",
              }}
            />
            <Input
              type="text"
              label="Valor Mínimo de Pedido"
              placeholder="Valor Mínimo de Pedido"
              {...registerF("endereco.dsComplemento")}
              defaultValue={dadosFornecedor?.endereco.dsComplemento || ""}
              style={{
                width: "200px",
              }}
            />
            {/* <span>Você não possuiu nenhum endereço!</span> */}
            {/* <ButtonSubmit type="button" onClick={handleShow}>
              Adicionar Endereço
            </ButtonSubmit>  */}
          </div>
          <div className="linha">
            <ButtonSubmit type="submit">Salvar Informações</ButtonSubmit>
          </div>
        </Form>

        <Modal
          show={showModalEndereco}
          onHide={handleClose}
          centered
          data-bs-theme={theme}
        >
          <Modal.Header style={{ border: "none" }}>
            <Modal.Title>Novo Endereço</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ContainerModal>
              <div className="linha">
                <Input
                  type="text"
                  label="Logradouro"
                  placeholder="Logradouro"
                  style={{
                    width: "200px",
                  }}
                />
                <Input
                  type="text"
                  label="Número"
                  placeholder="Número"
                  style={{
                    width: "200px",
                  }}
                />
              </div>
            </ContainerModal>
          </Modal.Body>
          <Modal.Footer style={{ border: "none" }}>
            <Button
              variant={theme === "light" ? "dark" : "light"}
              onClick={handleClose}
            >
              Cancelar
            </Button>
            <Button variant="warning" onClick={handleClose}>
              Adicionar Endereço
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </>
  );
};

export default User;
