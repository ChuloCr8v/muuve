import Logo from "@/components/Logo";
import ThemeToggle from "@/components/ThemeToggle";
import { Button } from "antd";
import { FaBars, FaPhoneFlip } from "react-icons/fa6";

const Header = () => {
  return (
    <header className="backdrop-blur-3xl shadow fixed top-0 left-0 z-[99999999] w-full flex flex-col items-center justify-center p-3">
      <div className="max-w-7xl w-full flex items-center justify-between">
        <Logo />
        {/* <Navigation /> */}

        <div className="hidden md:flex items-center justify-center gap-10">
          <Button
            size="small"
            className="rounded-full font-semibold text-sm"
            icon={
              <FaPhoneFlip className="rotate-90 bg-white text-primary rounded-full p-1 h-4 w-4" />
            }
            iconPosition="end"
            type="primary"
          >
            Get in Touch
          </Button>
          <ThemeToggle />
          <FaBars />
        </div>
      </div>
    </header>
  );
};

export default Header;
