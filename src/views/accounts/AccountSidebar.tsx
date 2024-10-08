import { Link, useLocation } from "react-router-dom";
import Heading from "../../components/global/Header";
import { twMerge } from "tailwind-merge";

const menuItems = [
  {
    label: "Profile Setting",
    url: "/account/settings",
  },
  {
    label: "Roles",
    url: "/account/roles",
  },
  {
    label: "Billing",
    url: "/account/billing",
  },
];

const AccountSidebar = () => {
  const { pathname } = useLocation();

  return (
    <div className="bg-white relative border-r h-screen overflow-hidden w-[250px]">
      <div className="w-[200px] accounts-sidebar space-y-3 p-4">
        <Heading heading="Account" />
        <div className="flex flex-col items-start w-full gap-2">
          {menuItems.map((item) => (
            <Link
              className={twMerge(
                "w-full hover:text-primary hover:bg-primary !bg-opacity-20 rounded-md p-1 px-2 text-grey duration-150 capitalize text-sm",
                pathname === item.url && "text-primary bg-primary "
              )}
              to={item.url}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AccountSidebar;
