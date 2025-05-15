import { useState } from "react";
import { Container, Form } from "./styles";
import { useAuth } from "../../context/AuthProvider";
import { useNavigate } from "react-router";
import { toast, Slide } from "react-toastify";

const Register = () => {
  const { login } = useAuth();

  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      await login(email, password);
      toast.success('Logado com sucesso!', {
        transition: Slide,
      });
      navigate('/user');
    } catch {
      toast.error('Erro ao logar!', {
        transition: Slide,
      });
    }
  }

  return (
    <>
      <Container>
        <Form>
          <button
            type="button"
            onClick={() => {
              setEmail('teste@gmail.com');
              setPassword('12345678');
            }}
          >Teste</button>
          <h1>Login</h1>
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="text" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button type="button" onClick={handleLogin}>Login</button>
        </Form>
      </Container>
    </>
  )
};

export default Register;