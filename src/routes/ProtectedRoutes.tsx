import { lazy } from "react";
import { Route, Routes } from "react-router-dom";

const ImportCustomerList = lazy(
  () => import("../components/customer/ImportCustomerList")
);
const ReportDetails = lazy(
  () => import("../components/operations/reports/ReportDetails")
);
const JobOrder = lazy(() => import("../views/projects/JobOrders"));
const Billing = lazy(() => import("../views/accounts/Billing"));
const PlanUpdate = lazy(() => import("../views/accounts/PlanUpdate"));
const ProfileSetting = lazy(() => import("../views/accounts/ProfileSetting"));
const Role = lazy(() => import("../views/accounts/Role"));
const FormConfig = lazy(() => import("../views/admin/config/FormConfig"));
const Customer = lazy(() => import("../views/admin/Customer"));
const CustomerPage = lazy(() => import("../views/admin/CustomerPage"));
const Staff = lazy(() => import("../views/admin/Staff"));
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

const ProtectedRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Survey />} />
      <Route path="/projects/surveys" element={<Survey />} />
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
      <Route path="/billing/subscription" element={<Subscription />} />
      <Route path="/billing/add-sub" element={<NewSubscription />} />
      <Route path="/billing/Invoices" element={<Invoices />} />
      <Route path="/projects/job-orders" element={<JobOrder />} />
      <Route path="/program" element={<Programs />} />
      <Route path="/admin/config" element={<FormConfig />} />
      <Route path="operations/report/details/:id" element={<ReportDetails />} />
      <Route path="/admin/staff" element={<Staff />} />
      <Route path="/admin/customers" element={<Customer />} />
      <Route
        path="/admin/customers/import-customers"
        element={<ImportCustomerList />}
      />
      <Route path="/admin/customer-page" element={<CustomerPage />} />
      <Route path="/operations/reports" element={<Operations />} />
    </Routes>
  );
};

export default ProtectedRoutes;
