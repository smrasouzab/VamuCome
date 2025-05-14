// import { RouterProvider } from "react-router";
import { AuthProvider } from "./context/AuthProvider";
import GlobalStyle from './styles/GlobalStyles.ts'
import RouterProvider from "./routes/RouterProvider.tsx";

function App() {

  return (
    <>
      <AuthProvider>
        <GlobalStyle />
        <RouterProvider />
      </AuthProvider>
    </>
  )
}

export default App
