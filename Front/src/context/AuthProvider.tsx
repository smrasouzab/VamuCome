import React, { useState, createContext, useCallback, useContext } from 'react';
import api from '../api';

interface AuthProviderProps extends React.PropsWithChildren {
  children: React.ReactNode;
}


interface LoginResponse {
  id: string;
  name: string;
  token: string;
  role: string;
}

interface User {
  id: string;
  nome: string;
  role: string;
}

interface AuthContextType {
  isAuthenticated: Promise<boolean>;
  user: User;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User>({} as User);
  const [isAuthenticated, setIsAuthenticated] = useState<Promise<boolean>>(async () => {
    const token = localStorage.getItem('token');

    const validateToken = async (token: string): Promise<boolean> => {
      try {
        const response = await api.post('/auth/validate-token', {
          token,
        });
        setUser({
          id: response.data.id,
          nome: response.data.name,
          role: response.data.role,
        } as User);
        return true;
      } catch {
        setUser({} as User);
        return false;
      }
    };

    return validateToken(token || '');
  });

  const login = useCallback(async (email: string, senha: string) => {
    const response = await api.post<LoginResponse>('/auth/login', {
      email: email,
      // senha: senha,
      password: senha,
    })

    if (response.status === 200) {
      setIsAuthenticated(Promise.resolve(true));
      setUser({
          id: response.data.id,
          nome: response.data.name,
          role: response.data.role,
        });
      localStorage.setItem('token', response.data.token);

      return true;
    }

    return false;
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
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