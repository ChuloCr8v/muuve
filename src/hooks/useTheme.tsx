import { setDarkMode, setLightMode } from "@/redux/themeSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function useTheme() {
  const { darkMode } = useSelector(
    (state: { theme: { darkMode: boolean } }) => state.theme
  );

  const dispatch = useDispatch();
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const toggleTheme = () => {
    dispatch(darkMode ? setLightMode() : setDarkMode());
  };

  return { darkMode, toggleTheme };
}
