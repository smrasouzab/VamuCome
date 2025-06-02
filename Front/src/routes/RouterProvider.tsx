import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import RegisterCliente from "../pages/RegisterCliente";
import RegisterFornecedor from "../pages/RegisterFornecedor";
import Login from "../pages/Login";
import User from "../pages/User";
import ProtectedRoute from "./ProtectedRoute";
import ProtectedRouteAdmin from "./ProtectedRouteAdmin";
import Navbar from "../components/Navbar";
import Loja from "../pages/Loja";
import Produto from "../pages/Produto";
import TelaPagamento from "../pages/TelaPagamento";
import Pedidos from "../pages/Pedidos";
import ProdFornecedor from "../pages/ProdFornecedor";
import PedidoFornecedor from "../pages/PedidoFornecedor";
import Carrinho from "../pages/Carrinho";
import LoginAdmin from "../pages/Admin/Login";
import Escolha from "../pages/Admin/Escolha";
import Relatorios from "../pages/Admin/Relatorios";
import CadastroProduto from "../pages/Admin/CadastroProduto";

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
        <Route path="/register-cliente" element={<NavbarRoute><RegisterCliente /></NavbarRoute>} />
        <Route path="/register-fornecedor" element={<NavbarRoute><RegisterFornecedor /></NavbarRoute>} />
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
        <Route path="/pedidos" element={<NavbarRoute><Pedidos /></NavbarRoute>} />
        <Route path="/produtos" element={<NavbarRoute><ProdFornecedor /></NavbarRoute>} />
        <Route path="/pedidos-fornecedor" element={<NavbarRoute><PedidoFornecedor /></NavbarRoute>} />
        <Route path="/carrinho" element={<NavbarRoute><Carrinho /></NavbarRoute>} />
        <Route path="/admin-login" element={<LoginAdmin />} />
        <Route path="/admin" element={<ProtectedRouteAdmin><Escolha /></ProtectedRouteAdmin>} />
        <Route path="/admin-relatorios" element={<ProtectedRouteAdmin><Relatorios /></ProtectedRouteAdmin>} />
        <Route path="/admin-produto" element={<ProtectedRouteAdmin><CadastroProduto /></ProtectedRouteAdmin>} />
        <Route path="*" element={<NavbarRoute><NotFound /></NavbarRoute>} />
      </Routes>
    </BrowserRouter>
  );
};

export default RouterProvider;