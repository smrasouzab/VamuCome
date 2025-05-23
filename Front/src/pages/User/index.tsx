import { useEffect, useState } from "react"
import { Container, Form } from "./styles"
import { useAuth } from "../../context/AuthProvider";
// import useTheme from "../../hooks/useTheme";
// import { useTheme } from "../../context/ThemeProvidder";
import { useNavigate } from "react-router";
import api from "../../api";
import { toast } from "react-toastify";

const User = () => {
  const { logout } = useAuth();

  // const { toogleTheme } = useTheme();

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
              <br />
              <button type="button" onClick={logout}>Logout</button>
              <br />
              <button type="button" onClick={() => navigate('/')}>Home</button>
              {/* <br />
              <button type="button" onClick={toogleTheme}>Trocar Tema</button> */}
              <br />
               <button type="button" onClick={() => toast('Notificação teste!')}>Notificação</button>
            </>
          ) : (
            <h2 style={{ color: 'red' }}>Não logado</h2>
          )}
        </Form>
      </Container>
    </>
  )
}

export default User;