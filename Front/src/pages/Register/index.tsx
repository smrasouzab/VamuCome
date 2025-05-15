import { useState } from "react";
import { Container, Form } from "./styles";
import { useNavigate } from "react-router";
import api from "../../api";
import { Slide, toast } from "react-toastify";

const Register = () => {

  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');

  const handleRegister = async () => {
    // const json = JSON.stringify({
    //   nmUsuario: name,
    //   dsEmail: email,
    //   dsSenha: password,
    //   enRole: role,
    // });

    const json = JSON.stringify({
      name: name,
      email: email,
      password: password,
      role: role,
    });

    try {
      await api
        .post('/auth/register', json, {
          headers: {
            'Content-Type': 'application/json',
          },
        })
      toast.success('Registrado com sucesso!', {
        transition: Slide,
      });
      navigate('/login');
    } catch {
      toast.error('Erro ao registrar!', {
        transition: Slide,
      });
    }

    // api
    //   .post('/auth/register', json, {
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //   })
    //   .then((response) => {
    //     console.log(response);
    //     if (response.status === 200 || response.status === 201) {
    //       alert('User registered successfully!');
    //       navigate('/login');
    //     } else {
    //       alert('Error registering user');
    //     }
    //   })
    //   .catch(() => {
    //     alert('Error registering user');
    //   });
  }

  return (
    <>
      <Container>
        <Form>
          <button
            type="button"
            onClick={() => {
              setName('Teste');
              setEmail('teste@gmail.com');
              setPassword('12345678');
              setRole('cliente');
            }}
          >Teste</button>
          <h1>Register</h1>
          <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="text" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          {/* <input type="text" placeholder="Role" value={role} onChange={(e) => setRole(e.target.value)} /> */}
          <select defaultValue={role} onChange={(e) => setRole(e.target.value)}>
            <option value="">Select Role</option>
            <option value="entregador">Entregador</option>
            <option value="cliente">Cliente</option>
          </select>
          <button type="button" onClick={handleRegister}>Register</button>
        </Form>
      </Container>
    </>
  )
};

export default Register;