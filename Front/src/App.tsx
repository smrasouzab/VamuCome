import { AuthProvider } from "./context/AuthProvider";
import GlobalStyle from './styles/GlobalStyles.ts'
import RouterProvider from "./routes/RouterProvider.tsx";
import { ToastContainer } from "react-toastify";
import { ThemeProvider } from "./context/ThemeProvidder.tsx";
import { useTheme } from "./context/ThemeProvidder.tsx";

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <GlobalStyleWrapper />
        <ToastContainerWrapper />
        <RouterProvider />
      </ThemeProvider>
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
