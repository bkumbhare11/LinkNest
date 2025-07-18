import { useTheme } from "./ThemeProvider";
import { MdNightlightRound } from "react-icons/md";
import { FaSun } from "react-icons/fa";

function ThemeToggle() {
  const { theme, setTheme, isMounted } = useTheme();

  

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <button onClick={toggleTheme} className="cursor-pointer">
      {theme === "dark" ? (
        <FaSun className="text-yellow-200 text-lg sm:text-2xl" />
      ) : (
        <MdNightlightRound className="text-lg sm:text-2xl" />
      )}
    </button>
  );
}

export default ThemeToggle;
