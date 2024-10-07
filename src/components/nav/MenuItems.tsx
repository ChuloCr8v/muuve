import CustomersActive from "/nav-icons/customers-active.svg";
import Customers from "/nav-icons/customers.svg";
import DevicesActive from "/nav-icons/devices-active.svg";
import Devices from "/nav-icons/devices.svg";
import JobOrdersActive from "/nav-icons/job-orders-active.svg";
import JobOrders from "/nav-icons/job-orders.svg";
import MaintenanceActive from "/nav-icons/maintenance-active.svg";
import Maintenance from "/nav-icons/maintenance.svg";
import ModelsActive from "/nav-icons/models-active.svg";
import Models from "/nav-icons/models.svg";
import PerfomanceRrportsActive from "/nav-icons/performance-reports-active.svg";
import PerfomanceRrports from "/nav-icons/performance-reports.svg";
import SnagActive from "/nav-icons/snag-active.svg";
import Snag from "/nav-icons/snag.svg";
import StaffActive from "/nav-icons/staff-active.svg";
import Staff from "/nav-icons/staff.svg";
import SurveysActive from "/nav-icons/surveys-active.svg";
import Surveys from "/nav-icons/surveys.svg";
import TicketsActive from "/nav-icons/tickets-active.svg";
import Tickets from "/nav-icons/tickets.svg";

export const menuItems = [
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
      // {
      //   title: "Strategic Requests",
      //   url: "/projects/strategic-requests",
      //   icon: StrategicRequests,
      //   iconActive: StrategicRequestsActive,
      // },
      // {
      //   title: "Operational Requests",
      //   url: "/projects/operational-requests",
      //   icon: OperationalRequests,
      //   iconActive: OperationalRequestsAtive,
      // },
    ],
  },
  {
    id: 2,
    title: "Operations",
    submenuItems: [
      {
        title: "Performance Reports",
        url: "/operations/reports",
        icon: PerfomanceRrports,
        iconActive: PerfomanceRrportsActive,
      },
      // {
      //   title: "Billing History",
      //   url: "/operations/billing-history",
      //   icon: BillingHistory,
      //   iconActive: BillingHistoryActive,
      // },
      // {
      //   title: "Incidents",
      //   url: "/operations/incidents",
      //   icon: Incidents,
      //   iconActive: IncidentsActive,
      // },
      {
        title: "Maintenance",
        url: "/operations/maintenance",
        icon: Maintenance,
        iconActive: MaintenanceActive,
      },
      // {
      //   title: "Changes",
      //   url: "/operations/changes",
      //   icon: Changes,
      //   iconActive: ChangesActive,
      // },
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
        url: "/inventory/model",
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
  // {
  //   id: 5,
  //   title: "Sales",
  //   submenuItems: [
  //     {
  //       title: "Surveys",
  //       url: "/sales/surveys",
  //       icon: Surveys,
  //       iconActive: SurveysActive,
  //     },
  //     {
  //       title: "Job Orders",
  //       url: "/sales/job-orders",
  //       iconActive: JobOrdersActive,
  //       icon: JobOrders,
  //     },
  //     {
  //       title: "Strategic Requests",
  //       url: "/sales/strategic-requests",
  //       iconActive: StrategicRequestsActive,
  //       icon: StrategicRequests,
  //     },
  //   ],
  // },
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
