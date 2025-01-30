import { useEffect, useState } from "react";
import { Link, Router, useLocation } from "react-router-dom";
import { twMerge } from "tailwind-merge";

type Props = {};

const navItems = [
  {
    label: "Home",
    url: "/",
  },
  {
    label: "About",
    url: "/#about",
  },
  {
    label: "Why Us",
    url: "/#why-us",
  },
  {
    label: "Services",
    url: "/#services",
  },
  {
    label: "Newsletter",
    url: "/#newsletter",
  },
];

const Navigation = (props: Props) => {
  const route = useLocation();

  return (
    <nav className="flex items-center gap-6">
      {navItems.map((item) => (
        <Link
          onClick={() => console.log(route.hash)}
          key={item.label}
          to={item.url}
          className={twMerge(
            "relative group hover:text-primary hover:font-semibold duration-200",
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
        </Link>
      ))}
    </nav>
  );
};

export default Navigation;
