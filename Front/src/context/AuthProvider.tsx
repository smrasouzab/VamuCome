import React, { useState, createContext, useCallback, useContext } from 'react';
import api from '../api';

interface AuthProviderProps extends React.PropsWithChildren {
  children: React.ReactNode;
}

interface AuthContextType {
  isAuthenticated: Promise<boolean>;
  role: string;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

interface LoginResponse {
  token: string;
  role: string;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<Promise<boolean>>(async () => {
    const token = localStorage.getItem('token');

    const validateToken = async (token: string): Promise<boolean> => {
      try {
        const response = await api.post('/auth/validate-token', {
          token,
        });
        setRole(response.data.decoded.role);
        return true;
      } catch {
        setRole('');
        return false;
      }
    };

    return validateToken(token || '');
  });
  const [role, setRole] = useState<string>('');

  const login = useCallback(async (email: string, senha: string) => {
    const reponse = await api.post<LoginResponse>('/auth/login', {
      email: email,
      senha: senha,
    })

    if (reponse.status === 200) {
      setIsAuthenticated(Promise.resolve(true));
      setRole(reponse.data.role);
      // Trocar para cookie
      localStorage.setItem('token', reponse.data.token);

      return true;
    }

    return false;
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(Promise.resolve(false));
    setRole('');
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        role,
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