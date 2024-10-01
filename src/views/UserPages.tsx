import { Navigate, Route, Routes } from "react-router-dom";
import ImportCustomerList from "../component/customer/ImportCustomerList";
import Layout from "../component/layout/Layout";
import ReportDetails from "../component/operations/reports/ReportDetails";
import ProfileSetting from "./accounts/ProfileSetting";
import Role from "./accounts/Role";
import Customer from "./Admin/Customer";
import CustomerPage from "./Admin/CustomerPage";
import Staff from "./Admin/Staff";
import Invoices from "./billing/invoices";
import NewSubscription from "./billing/subscription/NewSubscription";
import Subscription from "./billing/subscription/Subscriptions";
import Tickets from "./incidence/Tickets";
import Devices from "./inventory/Devices";
import Model from "./inventory/Model";
import Maintenance from "./operations/Maintenance";
import Operations from "./operations/Operations";
import Snags from "./operations/Snag";
import Programs from "./Programs";
import JobOrder from "./projects/JobOrders";
import Survey from "./projects/Survey";
import InitiatePayment from "./projects/surveys/InitiatePayment";
import Billing from "./accounts/Billing";
import PlanUpdate from "./accounts/PlanUpdate";

export default function UserPages() {
  // if (!useAuth()) {
  //   return <Navigate replace to="/login" />;
  // }
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate replace to="/projects/survey" />} />
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
        <Route path="/billing/subscription" element={<Subscription />} />
        <Route path="/billing/add-sub" element={<NewSubscription />} />
        <Route path="/billing/Invoices" element={<Invoices />} />
        <Route path="/projects/job-orders" element={<JobOrder />} />
        <Route path="/program" element={<Programs />} />
        <Route
          path="operations/report/details/:id"
          element={<ReportDetails />}
        />
        <Route path="/admin/staff" element={<Staff />} />
        <Route path="/admin/customers" element={<Customer />} />
        <Route
          path="/admin/customers/import-customers"
          element={<ImportCustomerList />}
        />
        <Route path="/admin/customer-page" element={<CustomerPage />} />
        <Route path="/operations/reports" element={<Operations />} />
      </Routes>
    </Layout>
  );
}
