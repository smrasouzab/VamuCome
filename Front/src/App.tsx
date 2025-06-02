import { AuthProvider } from "./context/AuthProvider";
import { AuthAdminProvider } from "./context/AuthAdminProvider.tsx";
import GlobalStyle from './styles/GlobalStyles.ts'
import RouterProvider from "./routes/RouterProvider.tsx";
import { ToastContainer } from "react-toastify";
import { ThemeProvider } from "./context/ThemeProvidder.tsx";
import { useTheme } from "./context/ThemeProvidder.tsx";

import 'bootstrap/dist/css/bootstrap.min.css';

import 'swiper/css';
import 'swiper/css/pagination';

function App() {
  return (
    <AuthProvider>
      <AuthAdminProvider>
        <ThemeProvider>
          <GlobalStyleWrapper />
          <ToastContainerWrapper />
          <RouterProvider />
        </ThemeProvider>
      </AuthAdminProvider>
    </AuthProvider>
  )
};

function GlobalStyleWrapper() {
  const { theme } = useTheme();
  return <GlobalStyle $themeColor={theme} />;
}

function ToastContainerWrapper() {
  const { theme } = useTheme();
  return <ToastContainer theme={theme} />;
}

export default App;
