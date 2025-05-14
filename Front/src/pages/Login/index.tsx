import { useState } from "react";
import { Container, Form } from "./styles";
import { useAuth } from "../../context/AuthProvider";
import { useNavigate } from "react-router";

const Register = () => {
  const { login } = useAuth();

  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const response = await login(email, password);

    if (response) {
      console.log('Login successful');
      navigate('/user');
    } else {
      console.log('Login failed');
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