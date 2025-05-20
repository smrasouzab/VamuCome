import { Container } from "./styles"
import { LuSun, LuMoon, LuMonitor } from "react-icons/lu";
import { useTheme } from "../../context/ThemeProvidder";
import { useEffect, useRef } from "react";

const ThemeSelector = () => {
  const { setTheme } = useTheme();
  
  const highlightRef = useRef<HTMLDivElement>(null);
  
  const handleThemeChange = (theme: string) => {
    if (highlightRef.current) {
      highlightRef.current.className = "highlight";
      // const isLightMode = window.matchMedia('(prefers-color-scheme: light)').matches;
      switch (theme) {
        case "light":
          setTheme("light");
          highlightRef.current.classList.add("pos1");
          break;
        case "dark":
          setTheme("dark");
          highlightRef.current.classList.add("pos2");
          break;
        case "system":
          // setTheme(isLightMode ? "light" : "dark");
          setTheme("system");
          highlightRef.current.classList.add("pos3");
          break;
        default:
          // setTheme(isLightMode ? "light" : "dark");
          setTheme("system");
          highlightRef.current.classList.add("pos3");
          break;
      }
    }
  }

  useEffect(() => {
  }, []);


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