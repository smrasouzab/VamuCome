import Button from 'react-bootstrap/esm/Button';
import { Container } from '../styles';
import Form from 'react-bootstrap/Form';
import ThemeSelectorBasic from '../../../components/ThemeSelectorBasic';
import { useTheme } from '../../../context/ThemeProvidder';
import { useAuthAdmin } from '../../../context/AuthAdminProvider';
import { Slide, toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import { useState } from 'react';

const Login = () => {
  const { login } = useAuthAdmin();

  const { theme } = useTheme();

  const navigate = useNavigate();

  const [nmUsuarioAdmin, setNmUsuarioAdmin] = useState("");
  const [dsSenhaAdmin, setDsSenhaAdmin] = useState("");

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await login(nmUsuarioAdmin, dsSenhaAdmin);
      toast.success("Logado com sucesso!", {
        transition: Slide,
      });
      navigate("/admin");
    } catch {
      toast.error("Erro ao logar!", {
        transition: Slide,
      });
    }
  };


  return (
    <Container data-bs-theme={theme}>
      <ThemeSelectorBasic />
      <Form onSubmit={(e) => handleLogin(e)}>
        <Form.Group className="mb-3" controlId="formUsuario">
          <Form.Label>Usuário</Form.Label>
          <Form.Control type="text" placeholder="Usuário" value={nmUsuarioAdmin} onChange={(e) => setNmUsuarioAdmin(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formSenha">
          <Form.Label>Senha</Form.Label>
          <Form.Control type="password" placeholder="Senha" value={dsSenhaAdmin} onChange={(e) => setDsSenhaAdmin(e.target.value)} />
        </Form.Group>
        <Button variant="primary" type="submit">
          Entrar
        </Button>
      </Form>
    </Container>
  )
};

export default Login;