import { useState } from "react";
import { Container, Form } from "./styles";
import { useAuth } from "../../context/AuthProvider";
import { useNavigate } from "react-router";
import { Bounce, toast, ToastContainer } from "react-toastify";

const Register = () => {
  const { login } = useAuth();

  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const notify = () => toast('Wow so easy !');

  const handleLogin = async () => {
    const response = await login(email, password);

    notify();

    if (response) {
      toast.success('Logado com sucesso!', {
        position: 'top-right',
      });
      navigate('/user');
    } else {
      notify();
    }
  }

  return (
    <>
      <Container>
        <ToastContainer />
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
          <ToastContainer />
          <button type="button" onClick={notify}>Notify !</button>
        </Form>
      </Container>
    </>
  )
};

export default Register;