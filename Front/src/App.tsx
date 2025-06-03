import { AuthProvider } from "./context/AuthProvider";
import { AuthAdminProvider } from "./context/AuthAdminProvider.tsx";
import GlobalStyle from "./styles/GlobalStyles.ts";
import RouterProvider from "./routes/RouterProvider.tsx";
import { ToastContainer } from "react-toastify";
import { ThemeProvider } from "./context/ThemeProvidder.tsx";
import { useTheme } from "./context/ThemeProvidder.tsx";

import "bootstrap/dist/css/bootstrap.min.css";

import "swiper/css";
import "swiper/css/pagination";
import { AvaliacaoProvider, useAvaliacao } from "./context/AvaliacaoProvider.tsx";
import Avaliacao from "./components/Avaliacao/index.tsx";

function App() {
  return (
    <AuthProvider>
      <AuthAdminProvider>
        <ThemeProvider>
          <AvaliacaoProvider>
            <GlobalStyleWrapper />
            <ToastContainerWrapper />
            <AvaliacaoContainerWrapper />
            <RouterProvider />
          </AvaliacaoProvider>
        </ThemeProvider>
      </AuthAdminProvider>
    </AuthProvider>
  );
}

function GlobalStyleWrapper() {
  const { theme } = useTheme();
  return <GlobalStyle $themeColor={theme} />;
}

function ToastContainerWrapper() {
  const { theme } = useTheme();
  return <ToastContainer theme={theme} />;
}

function AvaliacaoContainerWrapper() {
  const { showModal, closeModal } = useAvaliacao();
  return <Avaliacao showAvaliacao={showModal} handleClose={closeModal}  />;
}

export default App;
