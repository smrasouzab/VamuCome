import { useEffect, useState } from "react"
import { Container, Form } from "./styles"
import { useAuth } from "../../context/AuthProvider";
import { useNavigate } from "react-router";
import api from "../../api";

const index = () => {
  const { logout } = useAuth();

  const navigate = useNavigate();
  
  const [logado, setLogado] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');

    api.get('/user', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then((response) => {
        if (response.status === 200) {
          setLogado(true);
        } else {
          setLogado(false);
        }
      })
      .catch(() => {
        setLogado(false);
        console.log('USER NOT LOGGED IN');
      });
  });

  return (
    <>
      <Container>
        <Form>
          <h1>User</h1>
          {logado ? (
            <>
              <h2 style={{ color: 'green' }}>Logado</h2>
              <button type="button" onClick={logout}>Logout</button>
              <button type="button" onClick={() => navigate('/')}>Home</button>
            </>
          ) : (
            <h2 style={{ color: 'red' }}>Não logado</h2>
          )}
        </Form>
      </Container>
    </>
  )
}

export default index