import { FaMoon, FaSun } from "react-icons/fa6";
import useTheme from "../hooks/useTheme";
import { twMerge } from "tailwind-merge";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={twMerge(
        "rounded-lg bg-gray-200 transition order p-1",
        theme === "dark" && "bg-gray-700"
      )}
      title="Toggle theme"
    >
      <div
        className={twMerge(
          "flex items-center duration-200",
          theme === "light" && "rotate-180"
        )}
      >
        <FaSun
          className={twMerge(
            "text-yellow-500 text-xl duration-200 transition ",
            theme === "light" && "-scale-50"
          )}
        />

        <FaMoon
          className={twMerge(
            "text-gray-400 text-xl duration-200 rotate-[170deg]",
            theme === "dark" && "-scale-50"
          )}
        />
      </div>
    </button>
  );
}
