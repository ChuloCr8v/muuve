import Copyright from "@/components/Copyright";
import Logo from "@/components/Logo";
import useTheme from "@/hooks/useTheme";
import { FaHome, FaMapMarker } from "react-icons/fa";
import {
  FaBriefcase,
  FaEnvelope,
  FaMoneyBill1Wave,
  FaPhone,
  FaPlaneDeparture,
} from "react-icons/fa6";
import { twMerge } from "tailwind-merge";

const Footer = () => {
  const { darkMode } = useTheme();

  const footerMenuItems = [
    {
      title: "Navigation",
      menu: [
        {
          icon: FaHome,
          label: "Home",
          url: "#hero",
        },
        {
          icon: FaPlaneDeparture,
          label: "Trips",
          url: "#trips",
        },
        {
          icon: FaBriefcase,
          label: "Services",
          url: "#services",
        },
        // {
        //   icon: FaNewspaper,
        //   label: "Newsletter",
        //   url: "#newsletter",
        // },
      ],
    },
    {
      title: "Contact",
      menu: [
        {
          icon: FaPhone,
          label: "+234 813 8369 977",
        },
        {
          icon: FaEnvelope,
          label: "cleverdeveloper360@gmail.com",
        },
        {
          icon: FaMapMarker,
          label: "Lagos State, Nigeria",
        },
      ],
    },
    {
      title: "Resources",
      menu: [
        {
          icon: FaMoneyBill1Wave,
          label: "Pricing",
        },
        {
          icon: FaMapMarker,
          label: "Locations",
        },
        {
          icon: FaPlaneDeparture,
          label: "Book A Trip",
          url: "/#contact",
        },
      ],
    },
  ];

  return (
    <div
      className={twMerge(
        "w-full flex flex-col justify-center items-center relative z-[9999999] bg-gray-900 px-4 text-white lg:pt-10",
        darkMode && "bg-gray-800"
      )}
    >
      <div className="flex flex-col md:flex-row items-start justify-around max-w-5xl w-full py-8 mb-12 gap-6 md:gap-0">
        <div className="max-w-[200px] w-full space-y-2">
          <Logo />
          <p className="">Travel made easy.</p>
        </div>
        <div className="flex flex-col md:flex-row items-start w-full justify-around gap-6 md:gap-0">
          {footerMenuItems.map((item) => (
            <div className="flex flex-col items-start gap-3">
              <p className="font-semibold text-primary">{item.title}</p>
              <div className="flex flex-col items-start gap-2">
                {item.menu.map((subitem) => (
                  <div className="group flex items-center gap-3 text-sm">
                    <subitem.icon
                      className={twMerge(
                        "transition",
                        subitem.url && "group-hover:text-primary"
                      )}
                    />{" "}
                    {subitem.url ? (
                      <a href={subitem.url}>
                        <span className=" transition group-hover:text-primary">
                          {subitem.label}
                        </span>
                      </a>
                    ) : (
                      <div>
                        <p className="">{subitem.label}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <Copyright />
    </div>
  );
};

export default Footer;
