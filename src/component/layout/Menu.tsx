import { DownOutlined } from "@ant-design/icons";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import Surveys from "../../../public/nav-icons/surveys.svg";
import SurveysActive from "../../../public/nav-icons/surveys-active.svg";
import JobOrders from "../../../public/nav-icons/job-orders.svg";
import JobOrdersActive from "../../../public/nav-icons/job-orders-active.svg";
import StrategicRequests from "../../../public/nav-icons/strategic-requests.svg";
import StrategicRequestsActive from "../../../public/nav-icons/strategic-requests-active.svg";
import OperationalRequests from "../../../public/nav-icons/operational-requests.svg";
import OperationalRequestsAtive from "../../../public/nav-icons/operational-requests-active.svg";
import PerfomanceRrports from "../../../public/nav-icons/performance-reports.svg";
import PerfomanceRrportsActive from "../../../public/nav-icons/performance-reports-active.svg";
import BillingHistory from "../../../public/nav-icons/billing-history.svg";
import BillingHistoryActive from "../../../public/nav-icons/billing-history-active.svg";
import Incidents from "../../../public/nav-icons/incidents.svg";
import IncidentsActive from "../../../public/nav-icons/incidents-active.svg";
import Maintenance from "../../../public/nav-icons/maintenance.svg";
import MaintenanceActive from "../../../public/nav-icons/maintenance-active.svg";
import Changes from "../../../public/nav-icons/changes.png";
import ChangesActive from "../../../public/nav-icons/changes.png";
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

const menuItems = [
  {
    id: 1,
    title: "Projects",
    submenuItems: [
      {
        title: "Surveys",
        url: "/projects/surveys",
        icon: Surveys,
        iconActive: SurveysActive,
      },
      {
        title: "Job Orders",
        url: "/projects/job-orders",
        icon: JobOrders,
        iconActive: JobOrdersActive,
      },
      {
        title: "Strategic Requests",
        url: "/projects/strategic-requests",
        icon: StrategicRequests,
        iconActive: StrategicRequestsActive,
      },
      {
        title: "Operational Requests",
        url: "/projects/operational-requests",
        icon: OperationalRequests,
        iconActive: OperationalRequestsAtive,
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
        icon: PerfomanceRrports,
        iconActive: PerfomanceRrportsActive,
      },
      {
        title: "Billing History",
        url: "/operations/billing-history",
        icon: BillingHistory,
        iconActive: BillingHistoryActive,
      },
      {
        title: "Incidents",
        url: "/operations/incidents",
        icon: Incidents,
        iconActive: IncidentsActive,
      },
      {
        title: "Maintenance",
        url: "/operations/maintenance",
        icon: Maintenance,
        iconActive: MaintenanceActive,
      },
      {
        title: "Changes",
        url: "/operations/changes",
        icon: Changes,
        iconActive: ChangesActive,
      },
      {
        title: "Snag Reports",
        url: "/operations/snag-reports",
        icon: Snag,
        iconActive: SnagActive,
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
        icon: Models,
        iconActive: ModelsActive,
      },
      {
        title: "Devices",
        url: "/inventory/devices",
        icon: Devices,
        iconActive: DevicesActive,
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
        icon: Tickets,
        iconActive: TicketsActive,
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
        icon: Surveys,
        iconActive: SurveysActive,
      },
      {
        title: "Job Orders",
        url: "/sales/job-orders",
        iconActive: JobOrdersActive,
        icon: JobOrders,
      },
      {
        title: "Strategic Requests",
        url: "/sales/strategic-requests",
        iconActive: StrategicRequestsActive,
        icon: StrategicRequests,
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
        iconActive: StaffActive,
        icon: Staff,
      },
      {
        title: "Customers",
        url: "/admin/customers",
        iconActive: CustomersActive,
        icon: Customers,
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
            className="flex items-center justify-between w-full px-6 py-2 cursor-pointer"
            onClick={() =>
              setOpenMenuItem(openMenuItem === menuItem.id ? 0 : menuItem.id)
            }
          >
            <h2
              className={twMerge(
                "font-semibold uppercase text-sm",
                openMenuItem === menuItem.id && "text-primary"
              )}
            >
              {menuItem.title}
            </h2>

            <DownOutlined
              className={twMerge(
                "text-xs",
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
                  "duration-200 px-6 py-2 capitalize flex items-center gap-2 border-l-4 border-transparent hover:text-primary",
                  currentPath.includes(subMenuItem.url) &&
                    "text-primary border-primary "
                )}
              >
                <img
                  src={
                    currentPath.includes(subMenuItem.url)
                      ? subMenuItem.iconActive
                      : subMenuItem.icon
                  }
                  alt={subMenuItem.title}
                  className="h-4"
                />
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
