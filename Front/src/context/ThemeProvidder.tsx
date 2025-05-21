import { useState, createContext, useContext, useEffect } from 'react';
// import { toast } from 'react-toastify';

interface ThemeProviderProps extends React.PropsWithChildren {
  children: React.ReactNode;
}

interface ThemeContextType {
  theme: string;
  setTheme: (theme: string) => void;
  // toogleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({} as ThemeContextType);

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setThemeState] = useState(() => {

    if (localStorage.getItem('themeSyncWithSystem') === 'true') {
      const isLightMode = window.matchMedia('(prefers-color-scheme: light)').matches;

      if (isLightMode) {
        return 'light';
      }

      return 'dark';
    }

    const value = localStorage.getItem('theme');

    if (value === 'light' || value === 'dark') {
      return value;
    }

    return 'dark';
  });

  const setTheme = (theme: string) => {
    if (theme === 'light' || theme === 'dark') {
      setThemeState(theme);
      localStorage.setItem('themeSyncWithSystem', 'false');
    } else if (theme === 'system') {
      const isLightMode = window.matchMedia('(prefers-color-scheme: light)').matches;
      setThemeState(isLightMode ? 'light' : 'dark');
      localStorage.setItem('themeSyncWithSystem', 'true');
    }
  }

  // const toogleTheme = () => {
  //   if (theme === 'light') {
  //     setThemeState('dark');
  //   } else {
  //     setThemeState('light');
  //   }
  // }

  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        // toogleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('null');
  }

  return context;
}