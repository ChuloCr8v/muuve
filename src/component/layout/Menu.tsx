import { DownOutlined } from "@ant-design/icons";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { twMerge } from "tailwind-merge";

const menuItems = [
  {
    id: 1,
    title: "Projects",
    submenuItems: [
      {
        title: "Surveys",
        url: "/projects/surveys",
        icon: "",
      },
      {
        title: "Job Orders",
        url: "/projects/job-orders",
        icon: "",
      },
      {
        title: "Strategic Requests",
        url: "/projects/strategic-requests",
        icon: "",
      },
      {
        title: "Operational Requests",
        url: "/projects/operational-requests",
        icon: "",
      },
    ],
  },
  {
    id: 2,
    title: "Operations",
    submenuItems: [
      {
        title: "Performance Reports",
        url: "/operations/performance-reports",
        icon: "",
      },
      {
        title: "Billing History",
        url: "/operations/billing-history",
        icon: "",
      },
      {
        title: "Incidents",
        url: "/operations/incidents",
        icon: "",
      },
      {
        title: "Maintenance",
        url: "/operations/maintenance",
        icon: "",
      },
      {
        title: "Changes",
        url: "/operations/changes",
        icon: "",
      },
      {
        title: "Snag Reports",
        url: "/operations/snag-reports",
        icon: "",
      },
    ],
  },
  {
    id: 3,
    title: "Inventory",
    submenuItems: [
      {
        title: "Models",
        url: "/inventory/models",
        icon: "",
      },
      {
        title: "Devices",
        url: "/inventory/devices",
        icon: "",
      },
    ],
  },
  {
    id: 4,
    title: "Ticketing",
    submenuItems: [
      {
        title: "Tickets",
        url: "/ticketing/tickets",
        icon: "",
      },
    ],
  },
  {
    id: 5,
    title: "Sales",
    submenuItems: [
      {
        title: "Surveys",
        url: "/sales/surveys",
        icon: "",
      },
      {
        title: "Job Orders",
        url: "/sales/job-orders",
        icon: "",
      },
      {
        title: "Strategic Requests",
        url: "/sales/strategic-requests",
        icon: "",
      },
    ],
  },
  {
    id: 6,
    title: "Admin",
    submenuItems: [
      {
        title: "Staff",
        url: "/admin/staff",
        icon: "",
      },
      {
        title: "Customers",
        url: "/admin/customers",
        icon: "",
      },
    ],
  },
];

const Menu = () => {
  const [openMenuItem, setOpenMenuItem] = useState<number>(0);

  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <nav className="w-full">
      {menuItems.map((menuItem) => (
        <div className="w-full">
          <div
            className="flex items-center justify-between w-full px-6 py-2"
            onClick={() =>
              setOpenMenuItem(openMenuItem === menuItem.id ? 0 : menuItem.id)
            }
          >
            <h2
              className={twMerge(
                "font-semibold uppercase",
                openMenuItem === menuItem.id && "text-primary"
              )}
            >
              {menuItem.title}
            </h2>

            <DownOutlined
              className={twMerge(
                "",
                openMenuItem === menuItem.id &&
                  "-rotate-180 duration-200 text-primary"
              )}
            />
          </div>
          <div
            className={twMerge(
              "h-0 overflow-hidden",
              openMenuItem === menuItem.id && "h-fit"
            )}
          >
            {menuItem.submenuItems.map((subMenuItem) => (
              <Link
                to={subMenuItem.url}
                className={twMerge(
                  "duration-200 px-6 py-2 block capitalize",
                  currentPath.includes(subMenuItem.url) &&
                    "text-primary border-l-4 border-primary font-bold"
                )}
              >
                {subMenuItem.icon}
                <p className="">{subMenuItem.title}</p>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </nav>
  );
};

export default Menu;
