import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import SLAConfig from "../views/Admin/config/SLA/SLAConfig";
import Customer from "../views/Admin/Customer";
import CustomerPage from "../views/Admin/CustomerPage";
import Staff from "../views/Admin/Staff";
import Vendor from "../views/Admin/Vendor";
import NewService from "../views/billing/services/NewService";
import ServiceDetails from "../views/billing/services/ServiceDetails";
import Services from "../views/billing/services/Services";
import SubscriptionDetails from "../views/billing/subscription/SubscriptionDetails";
import FormConfig from "@/views/Admin/form/FormConfig";

const ImportCustomerList = lazy(
  () => import("../components/customer/ImportCustomerList")
);
const ReportDetails = lazy(
  () => import("../components/operations/reports/ReportDetails")
);
const JobOrder = lazy(() => import("../views/projects/JobOrder"));
const Billing = lazy(() => import("../views/accounts/Billing"));
const PlanUpdate = lazy(() => import("../views/accounts/PlanUpdate"));
const ProfileSetting = lazy(() => import("../views/accounts/ProfileSetting"));
const Role = lazy(() => import("../views/accounts/Role"));
const Invoices = lazy(() => import("../views/billing/invoices"));
const NewSubscription = lazy(
  () => import("../views/billing/subscription/NewSubscription")
);
const Subscription = lazy(
  () => import("../views/billing/subscription/Subscriptions")
);
const TicketDetail = lazy(() => import("../views/incidence/TicketDetail"));
const Tickets = lazy(() => import("../views/incidence/Tickets"));
const Devices = lazy(() => import("../views/inventory/Devices"));
const Model = lazy(() => import("../views/inventory/Model"));
const Maintenance = lazy(() => import("../views/operations/Maintenance"));
const Operations = lazy(() => import("../views/operations/Operations"));
const Snags = lazy(() => import("../views/operations/Snag"));
const Programs = lazy(() => import("../views/Programs"));
const Survey = lazy(() => import("../views/projects/Survey"));
const InitiatePayment = lazy(
  () => import("../views/projects/surveys/InitiatePayment")
);
const ProjectAtp = lazy(() => import("../views/projects/ProjectAtp"));

const ProtectedRoutes = () => {
  return (
    <Routes>
      {/* Projects */}
      <Route path="/" element={<Survey />} />
      <Route path="/projects/surveys" element={<Survey />} />
      <Route path="/projects/job-orders" element={<JobOrder />} />
      <Route path="/projects/atp" element={<ProjectAtp />} />

      <Route
        path="/projects/surveys/initiate-payment"
        element={<InitiatePayment />}
      />
      <Route path="/account/settings" element={<ProfileSetting />} />
      <Route path="/account/roles" element={<Role />} />
      <Route path="/account/billing" element={<Billing />} />
      <Route path="/account/plan-update" element={<PlanUpdate />} />
      <Route path="/operations/maintenance" element={<Maintenance />} />
      <Route path="/operations/snag-reports" element={<Snags />} />
      <Route path="/inventory/model" element={<Model />} />
      <Route path="/inventory/devices" element={<Devices />} />
      <Route path="/incidence/tickets" element={<Tickets />} />
      <Route path="/incidence/tickets/:id" element={<TicketDetail />} />

      {/* Biilig */}
      <Route path="/billing/subscription" element={<Subscription />} />
      <Route
        path="/billing/subscription/:id"
        element={<SubscriptionDetails />}
      />
      <Route path="/billing/add-sub" element={<NewSubscription />} />
      <Route path="/billing/edit-sub/:id" element={<NewSubscription />} />
      <Route path="/billing/Invoices" element={<Invoices />} />
      <Route path="/billing/services" element={<Services />} />
      <Route path="/billing/services/new-service" element={<NewService />} />
      <Route
        path="/billing/services/edit-service/:id"
        element={<NewService />}
      />
      <Route path="/billing/services/plan/:id" element={<ServiceDetails />} />

      <Route path="/program" element={<Programs />} />
      <Route path="/admin/config" element={<FormConfig />} />
      <Route path="/admin/config/sla" element={<SLAConfig />} />

      <Route path="operations/report/details/:id" element={<ReportDetails />} />
      <Route path="/admin/staff" element={<Staff />} />
      <Route path="/admin/customers" element={<Customer />} />
      <Route
        path="/admin/customers/import-customers"
        element={<ImportCustomerList />}
      />
      <Route path="/admin/customer-page" element={<CustomerPage />} />
      <Route path="/admin/vendor" element={<Vendor />} />
      <Route path="/operations/reports" element={<Operations />} />
    </Routes>
  );
};

export default ProtectedRoutes;
