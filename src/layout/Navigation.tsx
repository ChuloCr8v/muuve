import { toggleNav } from "@/redux/navSlice";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { twMerge } from "tailwind-merge";

const navItems = [
  {
    label: "Home",
    url: "/#",
  },
  // {
  //   label: "About",
  //   url: "/#about",
  // },
  // {
  //   label: "Why Us",
  //   url: "/#why-us",
  // },
  {
    label: "Trips",
    url: "/#trips",
  },
  {
    label: "Services",
    url: "/#services",
  },
  {
    label: "Contact",
    url: "/#contact",
  },
];

const Navigation = () => {
  const route = useLocation();

  const { isOpen } = useSelector((state: any) => state.nav);
  const dispatch = useDispatch();

  return (
    <nav
      className={twMerge(
        "top-12 z-[99999999] w-full md:w-fit fixed md:top-0 md:translate-y-0 px-2 mt-4 -translate-y-[100vh] duration-300",
        isOpen && "translate-y-0"
      )}
    >
      <div className="flex flex-col md:flex-row items-start md:items-center gap-6 bg-black/20 nav-mobile !backdrop-blur-xl px-4 py-6 md:p-0 rounded-lg md:bg-transparent md:backdrop-filter-none">
        {navItems.map((item) => (
          <a
            onClick={() => dispatch(toggleNav())}
            key={item.label}
            href={item.url}
            className={twMerge(
              "relative group hover:text-primary hover:font-semibold duration-200 text-sm",
              route.hash === item.url.replace("/", "") &&
                "text-primary font-semibold"
            )}
          >
            {item.label}
            <span
              className={twMerge(
                "absolute left-0 -bottom-0 h-[2px] bg-primary w-0 group-hover:w-full duration-300",
                route.hash === item.url.replace("/", "") && "w-full"
              )}
            ></span>
          </a>
        ))}
      </div>
    </nav>
  );
};

export default Navigation;
