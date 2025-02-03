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

  return (
    <nav className="top-20 w-full absolute md:relative">
      <div className="flex flex-col md:flex-row items-start md:items-center gap-6 bg-black bg-opacity-40 backdrop-blur-sm px-4 py-6 rounded-lg">
        {navItems.map((item) => (
          <a
            onClick={() => console.log(route.hash)}
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
