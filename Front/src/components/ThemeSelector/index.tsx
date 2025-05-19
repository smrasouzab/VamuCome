import { Container } from "./styles"
import { LuSun, LuMoon, LuMonitor } from "react-icons/lu";
import { useTheme } from "../../context/ThemeProvidder";
import { useRef } from "react";

const ThemeSelector = () => {
  const { setTheme } = useTheme();
  
  const highlightRef = useRef<HTMLDivElement>(null);
  
  const handleThemeChange = (theme: string) => {
    if (highlightRef.current) {
      const isLightMode = window.matchMedia('(prefers-color-scheme: light)').matches;
      switch (theme) {
        case "light":
          highlightRef.current.style.left = "9px";
          setTheme("light");
          break;
        case "dark":
          highlightRef.current.style.left = "54px";
          setTheme("dark");
          break;
        case "system":
          highlightRef.current.style.left = "-3px";
          setTheme(isLightMode ? "light" : "dark");
          break;
        default:
          highlightRef.current.style.left = "-3px";
          setTheme(isLightMode ? "light" : "dark");
          break;
      }
    }
  }

  return (
    <Container>
      <div className="highlight" ref={highlightRef} />
      <LuSun size={30} onClick={() => handleThemeChange("light")} />
      <LuMoon size={30} onClick={() => handleThemeChange("dark")} />
      <LuMonitor size={30} onClick={() => handleThemeChange("system")} />
    </Container>
  )
} 

export default ThemeSelector;