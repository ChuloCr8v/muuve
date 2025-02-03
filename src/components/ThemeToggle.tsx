import useTheme from "@/hooks/useTheme";
import { FaMoon, FaSun } from "react-icons/fa6";
import { twMerge } from "tailwind-merge";

export default function ThemeToggle() {
  const { toggleTheme, darkMode } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={twMerge(
        "rounded-lg bg-gray-200 transition order p-1",
        darkMode && "bg-gray-700"
      )}
      title="Toggle theme"
    >
      <div
        className={twMerge(
          "flex items-center duration-200",
          !darkMode && "rotate-180"
        )}
      >
        <FaSun
          className={twMerge(
            "text-yellow-500 text-xl duration-200 transition ",
            !darkMode && "-scale-50"
          )}
        />

        <FaMoon
          className={twMerge(
            "text-gray-400 text-xl duration-200 rotate-[170deg]",
            darkMode && "-scale-50"
          )}
        />
      </div>
    </button>
  );
}
