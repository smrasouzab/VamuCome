import { useEffect, useState } from 'react'
import { useTheme } from "../../context/ThemeProvidder";
import FormSelect from 'react-bootstrap/esm/FormSelect';

const ThemeSelectorBasic = () => {
  const { theme, setTheme } = useTheme();

  const [value, setValue] = useState('system');

  const setThemeValue = (theme: string) => {
    setTheme(theme);
    setValue(theme);
  };

  useEffect(() => {
    if (localStorage.getItem('themeSyncWithSystem') === null || localStorage.getItem('themeSyncWithSystem') === undefined || localStorage.getItem('themeSyncWithSystem') === 'true') {
      setTheme("system");
      setValue("system");
    } else {
      setTheme(theme);
      setValue(theme);
    }
  }, [theme, setTheme]);

  return (
    <div
      style={{
        position: "absolute",
        top: "10px",
        right: "10px",
      }}
    >
      <FormSelect value={value} onChange={(e) => setThemeValue(e.target.value)}>
        <option value="light">Claro</option>
        <option value="dark">Escuro</option>
        <option value="system">Sistema</option>
      </FormSelect>
    </div>
  )
}

export default ThemeSelectorBasic;