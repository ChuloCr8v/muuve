import { Button } from "antd";
import Navigation from "./Navigation";
import { FaPhoneFlip } from "react-icons/fa6";
import ThemeToggle from "@/components/ThemeToggle";

const Header = () => {
  return (
    <header className="backdrop-blur-3xl shadow fixed top-0 left-0 z-50 w-full flex flex-col items-center justify-center p-3">
      <div className="max-w-7xl w-full flex items-center justify-between">
        <h2 className="font-bold text-xl   uppercase">
          M
          <span className="border-b-2 border-primary text-primary text-xl">
            uu
          </span>
          ve
        </h2>
        <Navigation />

        <div className="flex items-center justify-center gap-10">
          <Button
            size="small"
            className="rounded-full font-semibold"
            icon={
              <FaPhoneFlip className="rotate-90 bg-white text-primary rounded-full p-1 h-5 w-5" />
            }
            iconPosition="end"
            type="primary"
          >
            Get in Touch
          </Button>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;
