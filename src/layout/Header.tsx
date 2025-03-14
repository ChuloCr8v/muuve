import Logo from "@/components/Logo";
import ThemeToggle from "@/components/ThemeToggle";
import useTheme from "@/hooks/useTheme";
import { toggleNav } from "@/redux/navSlice";
import { Button } from "antd";
import { FaBars, FaPhoneFlip } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { twMerge } from "tailwind-merge";

const Header = () => {
  const dispatch = useDispatch();

  const { darkMode } = useTheme();

  return (
    <header className="backdrop-blur-xl shadow fixed top-0 left-0 z-[99999999] w-full flex flex-col items-center justify-center p-3">
      <div className="max-w-7xl w-full flex items-center justify-between relative">
        <Logo />

        <div className="flex items-center justify-center gap-10">
          <Button
            size="small"
            className="rounded-full font-semibold text-sm hidden md:flex"
            icon={
              <FaPhoneFlip className="rotate-90 bg-white text-primary rounded-full p-1 h-4 w-4" />
            }
            iconPosition="end"
            type="primary"
          >
            Get in Touch
          </Button>
          <ThemeToggle />

          <Button
            onClick={() => dispatch(toggleNav())}
            type="link"
            className={twMerge(
              "text-black text-2xl md:hidden",
              darkMode && "text-white"
            )}
          >
            <FaBars />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
