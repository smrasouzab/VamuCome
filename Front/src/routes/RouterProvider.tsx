import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import Register from "../pages/Register";
import Login from "../pages/Login";
import User from "../pages/User";
import ProtectedRoute from "./ProtectedRoute";
import Navbar from "../components/Navbar";
import HomeListagem from "../pages/Home/Listagem";
import Loja from "../pages/Loja";
import Produto from "../pages/Produto";
import TelaPagamento from "../pages/TelaPagamento";

const RouterProvider = () => {
  const NavbarRoute = ({ children }: { children: React.ReactNode }) => {
    return (
      <>
        <Navbar />
        {children}
      </>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<NavbarRoute><Home /></NavbarRoute>} />
        <Route path="/home" element={<NavbarRoute><Home /></NavbarRoute>} />
        <Route path="/home-listagem" element={<NavbarRoute><HomeListagem /></NavbarRoute>} />
        <Route path="/register" element={<NavbarRoute><Register /></NavbarRoute>} />
        <Route path="/login" element={<NavbarRoute><Login /></NavbarRoute>} />
        <Route
          path="/user"
          element={
            <ProtectedRoute>
              <NavbarRoute>
                <User />
              </NavbarRoute>
            </ProtectedRoute>
          }
        />
        <Route path="/loja" element={<NavbarRoute><Loja /></NavbarRoute>} />
        <Route path="/produto" element={<NavbarRoute><Produto /></NavbarRoute>} />
        <Route path="/tela-pagamento" element={<NavbarRoute><TelaPagamento /></NavbarRoute>} />
        <Route path="*" element={<NavbarRoute><NotFound /></NavbarRoute>} />
      </Routes>
    </BrowserRouter>
  );
};

export default RouterProvider;