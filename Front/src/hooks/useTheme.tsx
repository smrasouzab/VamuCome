const useTheme = () => {
  const theme = () => {
    const value = localStorage.getItem('theme');

    if (value === 'light' || value === 'dark') {
      return value;
    } else {
      localStorage.setItem('theme', 'light');
      return 'light';
    }
  }

  const setTheme = (theme: string) => {
    if (theme === 'light' || theme === 'dark') {
      localStorage.setItem('theme', theme);
    } else {
      console.error('Invalid theme value. Use "light" or "dark".');
    }
  }

  const toogleTheme = () => {
    const currentTheme = localStorage.getItem('theme');

    if (currentTheme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  }

  return { theme, setTheme, toogleTheme };
}

export default useTheme;