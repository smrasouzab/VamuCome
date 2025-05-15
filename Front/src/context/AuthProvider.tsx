import React, { useState, createContext, useCallback, useContext, useEffect } from 'react';
import api from '../api';

interface AuthProviderProps extends React.PropsWithChildren {
  children: React.ReactNode;
}

interface AuthContextType {
  isAuthenticated: boolean;
  role: string;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

interface LoginResponse {
  token: string;
  role: string;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [role, setRole] = useState<string>('');

  useEffect(() => {
    const token = localStorage.getItem('token');

    const validateToken = async (token: string) => {
      try {
        const response = await api.post('/auth/validate-token', {
          token,
        });
        setIsAuthenticated(true);
        setRole(response.data.decoded.role);
        console.log('Token válido');
      } catch {
        setIsAuthenticated(false);
        setRole('');
        console.log('Token inválido - 2');
      }
    }

    validateToken(token || '');
  }, [])


  const login = useCallback(async (email: string, password: string) => {
    // const reponse = await api.post<LoginResponse>('/auth/login', {
    //   dsEmail: email,
    //   dsSenha: password,
    // })

    const reponse = await api.post<LoginResponse>('/auth/login', {
      email: email,
      password: password,
    })

    if (reponse.status === 200) {
      setIsAuthenticated(true);
      setRole(reponse.data.role);
      // Trocar para cookie
      localStorage.setItem('token', reponse.data.token);

      return true;
    }

    return false;
  }, []);

  const logout = () => {
    setIsAuthenticated(false);
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

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('null');
  }

  return context;
}