import React, { useState, createContext, useCallback, useContext } from 'react';
import api from '../api';

interface AuthProviderProps extends React.PropsWithChildren {
  children: React.ReactNode;
}


interface LoginResponse {
  id: string;
  nome: string;
  role: string;
  token: string;
}

interface User {
  id: string;
  nome: string;
  role: string;
}

interface AuthContextType {
  isAuthenticated: Promise<boolean>;
  user: User;
  login: (role: string, email: string, senha: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User>({} as User);
  const [isAuthenticated, setIsAuthenticated] = useState<Promise<boolean>>(async () => {
    const token = localStorage.getItem('token');

    if (!token || token === undefined || token === null) {
      setUser({} as User);
      return false;
    }

    api.defaults.headers.authorization = `Bearer ${token}`;

    const validateToken = async (): Promise<boolean> => {
      try {
        const response = await api.get('/auth/validate-token');
        setUser({
          id: response.data.id,
          nome: response.data.nome,
          role: response.data.role,
        } as User);
        return true;
      } catch {
        localStorage.removeItem('token');
        api.defaults.headers.authorization = '';
        setUser({} as User);
        return false;
      }
    };

    return validateToken();
  });

  const login = useCallback(async (role: string, email: string, senha: string) => {

    const dataCliente = {
      dsEmailCliente: email,
      dsSenhaCliente: senha,
    };

    const dataFornecedor = {
      dsEmailFornecedor: email,
      dsSenhaFornecedor: senha,
    };
    
    const response = await api.post<LoginResponse>(`/auth/${role}/login`, role === 'fornecedor' ? dataFornecedor : dataCliente);

    if (response.status === 200) {
      setIsAuthenticated(Promise.resolve(true));
      setUser({
        id: response.data.id,
        nome: response.data.nome,
        role: response.data.role,
      } as User);
      api.defaults.headers.authorization = `Bearer ${response.data.token}`;
      localStorage.setItem('token', response.data.token);

      return true;
    }

    return false;
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    api.defaults.headers.authorization = '';
    setIsAuthenticated(Promise.resolve(false));
    setUser({} as User);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
};

const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('null');
  }

  return context;
}

export { AuthProvider, useAuth };