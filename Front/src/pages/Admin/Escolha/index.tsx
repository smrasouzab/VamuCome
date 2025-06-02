import { useNavigate } from 'react-router';
import { Container } from '../styles'
import Button from 'react-bootstrap/esm/Button';
import { useTheme } from '../../../context/ThemeProvidder';
import ThemeSelectorBasic from '../../../components/ThemeSelectorBasic';
import { useAuthAdmin } from '../../../context/AuthAdminProvider';

const Escolha = () => {
  const { theme } = useTheme();

  const { logout } = useAuthAdmin();

  const navigate = useNavigate();

  return (
    <Container data-bs-theme={theme}>
      <ThemeSelectorBasic />
      <Button
        variant="primary"
        onClick={() => navigate("/admin-relatorios")}
      >
        Acessar Relatórios
      </Button>
      <Button
        variant="primary"
        onClick={() => navigate("/admin-produto")}
      >
        Acessar Cadastro de Produtos
      </Button>
      <Button
        variant="danger"
        onClick={logout}
      >
        Sair
      </Button>
    </Container>
  )
}

export default Escolha;