import { Container, Links, StyledNavLink } from "./styles";

const Home = () => {
  return (
    <>
      <Container>
        <Links>
          <StyledNavLink to="/test-api">Test API</StyledNavLink>
          <StyledNavLink to="/register">Register</StyledNavLink>
          <StyledNavLink to="/login">Login</StyledNavLink>
          <StyledNavLink to="/user">User</StyledNavLink>
        </Links>
      </Container>
    </>
  )
}

export default Home;