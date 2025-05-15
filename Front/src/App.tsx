import { AuthProvider } from "./context/AuthProvider";
import GlobalStyle from './styles/GlobalStyles.ts'
import RouterProvider from "./routes/RouterProvider.tsx";
import { ToastContainer } from "react-toastify";
import { ThemeProvider, useTheme } from "./context/ThemeProvidder.tsx";

function App() {
  return (
    <>
      <AuthProvider>
        <ThemeProvider>
          <ThemedApp />
        </ThemeProvider>
      </AuthProvider>
    </>
  )
};

function ThemedApp() {
  const { theme } = useTheme();

  return (
    <>
      <GlobalStyle $themeColor={theme === 'light' ? '#ffffff' : '#000000'} />
      <ToastContainer
        theme={theme}
      />
      <RouterProvider />
    </>
  );
}

export default App;
