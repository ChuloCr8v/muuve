import { CaretDownFilled } from "@ant-design/icons";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import Surveys from "../../../public/nav-icons/surveys.svg";
import SurveysActive from "../../../public/nav-icons/surveys-active.svg";
import JobOrders from "../../../public/nav-icons/job-orders.svg";
import JobOrdersActive from "../../../public/nav-icons/job-orders-active.svg";
import PerfomanceRrports from "../../../public/nav-icons/performance-reports.svg";
import PerfomanceRrportsActive from "../../../public/nav-icons/performance-reports-active.svg";
import Maintenance from "../../../public/nav-icons/maintenance.svg";
import MaintenanceActive from "../../../public/nav-icons/maintenance-active.svg";
import Snag from "../../../public/nav-icons/snag.svg";
import SnagActive from "../../../public/nav-icons/snag-active.svg";
import Models from "../../../public/nav-icons/models.svg";
import ModelsActive from "../../../public/nav-icons/models-active.svg";
import Devices from "../../../public/nav-icons/devices.svg";
import DevicesActive from "../../../public/nav-icons/devices-active.svg";
import Tickets from "../../../public/nav-icons/tickets.svg";
import TicketsActive from "../../../public/nav-icons/tickets-active.svg";
import Staff from "../../../public/nav-icons/staff.svg";
import StaffActive from "../../../public/nav-icons/staff-active.svg";
import Customers from "../../../public/nav-icons/customers.svg";
import CustomersActive from "../../../public/nav-icons/customers-active.svg";
import { Tooltip } from "antd";

const menuItems = [
  {
    id: 1,
    title: "Projects",
    submenuItems: [
      { title: "Surveys", url: "/projects/surveys", icon: Surveys, iconActive: SurveysActive },
      { title: "Job Orders", url: "/projects/job-orders", icon: JobOrders, iconActive: JobOrdersActive },
    ],
  },
  {
    id: 2,
    title: "Operations",
    submenuItems: [
      { title: "Performance Reports", url: "/operations/reports", icon: PerfomanceRrports, iconActive: PerfomanceRrportsActive },
      { title: "Maintenance", url: "/operations/maintenance", icon: Maintenance, iconActive: MaintenanceActive },
      { title: "Snag Reports", url: "/operations/snag-reports", icon: Snag, iconActive: SnagActive },
    ],
  },
  {
    id: 3,
    title: "Inventory",
    submenuItems: [
      { title: "Models", url: "/inventory/model", icon: Models, iconActive: ModelsActive },
      { title: "Devices", url: "/inventory/devices", icon: Devices, iconActive: DevicesActive },
    ],
  },
  {
    id: 4,
    title: "Ticketing",
    submenuItems: [
      { title: "Tickets", url: "/ticketing/tickets", icon: Tickets, iconActive: TicketsActive },
    ],
  },
  {
    id: 6,
    title: "Admin",
    submenuItems: [
      { title: "Staff", url: "/admin/staff", icon: Staff, iconActive: StaffActive },
      { title: "Customers", url: "/admin/customers", icon: Customers, iconActive: CustomersActive },
    ],
  },
];

interface Prop {
  collapse: boolean;
}

const Menu = ({ collapse }: Prop) => {
  const [openMenuItem, setOpenMenuItem] = useState<number>(0);
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <nav className="w-full overflow-y-auto">
      {menuItems.map((menuItem) => (
        <div key={menuItem.id} className="w-full ">
          {/* Normal Menu Display */}
          {!collapse ? (
            <>
              <div
                className="flex items-center justify-between w-full px-6 py-2 cursor-pointer"
                onClick={() => setOpenMenuItem(openMenuItem === menuItem.id ? 0 : menuItem.id)}
              >
                <h2 className={twMerge("font-semibold uppercase text-sm text-[12px]", openMenuItem === menuItem.id && "text-primary")}>
                  {menuItem.title}
                </h2>
                <CaretDownFilled
                  className={twMerge("text-sm text-grey", openMenuItem === menuItem.id && "-rotate-180 duration-200 text-primary")}
                />
              </div>
              <div className={twMerge("h-0 overflow-hidden", openMenuItem === menuItem.id && "h-fit")}>
                {menuItem.submenuItems.map((subMenuItem) => (
                  <Link
                    key={subMenuItem.url}
                    to={subMenuItem.url}
                    className={twMerge(
                      "duration-200 px-6 py-2 capitalize flex items-center gap-2 border-l-4 border-transparent hover:text-primary",
                      currentPath.includes(subMenuItem.url) && "text-primary border-primary ",
                    )}
                  >
                    <img
                      src={currentPath.includes(subMenuItem.url) ? subMenuItem.iconActive : subMenuItem.icon}
                      alt={subMenuItem.title}
                      className="h-4"
                    />
                    <p className="text-[13px]">{subMenuItem.title}</p>
                  </Link>
                ))}
              </div>
            </>
          ) : (
            // Collapsed Menu - Show Icons Only
            <div className="flex flex-col items-center gap-2 py-1 text-[12px]">
              {menuItem.submenuItems.map((subMenuItem) => (
                <Tooltip placement="right" title={subMenuItem.title}>
                  <Link key={subMenuItem.url} to={subMenuItem.url} className="py-[2px]">
                  <img
                    src={currentPath.includes(subMenuItem.url) ? subMenuItem.iconActive : subMenuItem.icon}
                    alt={subMenuItem.title}
                    className="h-5"
                  />
                </Link>
                </Tooltip>
              ))}
              {/* Divider between menu items */}
              <hr className="w-4/5 border-gray-300 my-1" />
            </div>
          )}
        </div>
      ))}
    </nav>
  );
};

export default Menu;
