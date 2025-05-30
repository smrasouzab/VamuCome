import { useEffect, useState } from "react";
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
import { useNavigate } from "react-router";
import api from "../../api";
import { toast } from "react-toastify";
import Input from "../../components/Input";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const User = () => {
  const { logout, user } = useAuth();

  // const { toogleTheme } = useTheme();

  const navigate = useNavigate();

  const [showModalEndereco, setShowModalEndereco] = useState(false);

  const handleClose = () => setShowModalEndereco(false);
  const handleShow = () => setShowModalEndereco(true);

  useEffect(() => {
    if (!user.id) {
      navigate("/login");
    }
  }, [user, navigate]);

  return (
    <>
      <Container>
        <Header>
          <h1>Bem-Vindo, {user.nome}.</h1>
        </Header>
        <Form>
          <div className="coluna">
            <span className="title">Dados Pessoais</span>
            <Input
              type="text"
              label="Nome de Usuário"
              placeholder="Seu nome"
              style={{
                width: "200px",
              }}
            />
            <Input
              type="text"
              label="CPF"
              placeholder="CPF"
              style={{
                width: "200px",
              }}
            />
          </div>
          <div className="coluna">
            <span className="title">Endereço</span>
            <span>Você não possuiu nenhum endereço!</span>
            <ButtonSubmit type="button" onClick={handleShow}>
              Adicionar Endereço
            </ButtonSubmit>
          </div>
          <div className="linha">
            <ButtonSubmit type="submit">Salvar Informações</ButtonSubmit>
          </div>
        </Form>

        <Modal show={showModalEndereco} onHide={handleClose} centered>
          <Modal.Header style={{border: "none"}}>
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
          <Modal.Footer style={{border: "none"}}>
            <Button variant="dark" onClick={handleClose}>
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
