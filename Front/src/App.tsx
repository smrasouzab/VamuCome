// import { RouterProvider } from "react-router";
import { AuthProvider } from "./context/AuthProvider";
import GlobalStyle from './styles/GlobalStyles.ts'
import RouterProvider from "./routes/RouterProvider.tsx";
import { ToastContainer } from "react-toastify";
import useTheme from "./hooks/useTheme.tsx";

function App() {

  const { theme } = useTheme();

  return (
    <>
      <AuthProvider>
        <GlobalStyle />
        <ToastContainer 
          theme={theme()}
        />
        <RouterProvider />
      </AuthProvider>
    </>
  )
}

export default App
